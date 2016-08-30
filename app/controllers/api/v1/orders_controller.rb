class Api::V1::OrdersController < Api::V1::BaseController
  before_action :authenticate_user!, only: [:show, :update, :confirm, :notify]
  before_action :set_form, only: [:create]

  def show
    @order = Order.find(params[:id])
    authorize @order
    render json: @order, include: ['line_items.product', 'address', 'orders_status']
  end

  def update
    @order = Order.find(params[:id])
    authorize @order
    @order.orders_status = OrdersStatus.find(params[:order][:orders_status][:id])

    form = OrderForm.new @order
    if form.validate(order_params)
      form.save
      render json: @order, include: ['line_items.product', 'address', 'orders_status']
    else
      render json: form.errors, status: :unprocessable_entity
    end
  end

  def create
    if @form.validate(order_params)
      @form.save
      flash[:notice] = "Отлично, вы успешно сделали заказ, мы с вами свяжемся в ближайшее время."
      AfterCreateOrder.run(order: @form.model, cart: @cart)
      render json: nil
    else
      render json: @form.errors, status: :unprocessable_entity
    end
  end

  def confirm
    @order = Order.find params[:id]
    authorize @order
    OrderMailer.delay.confirm @order.id
    render json: @order
  end

  def notify
    @order = Order.find params[:id]
    authorize @order
    OrderMailer.delay.notify @order.id
    render json: @order
  end

  private

  def order_params
    params.require(:order).permit(:name, :orders_status, :delivery_price, :email, :phone, address: [:city, :address])
  end

  def adapted_params
    order_params[:address_attributes] = order_params[:address]
  end

  def set_form
    form_data = {orders_status: OrdersStatus.first}
    address = Address.new(user: current_user)
    if user_signed_in?
      form_data.merge!({
        email: current_user.email,
        phone: current_user.phone,
        name: current_user.name
      })
      address = current_user.addresses.last || Address.new(user: current_user)
    end
    form_data.merge!({ address: address, user: current_user })
    order = Order.new(form_data)
    @form = OrderForm.new order
  end
end
