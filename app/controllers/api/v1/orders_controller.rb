class Api::V1::OrdersController < ApplicationController
  before_action :set_form, only: [:create, :update]

  def show
    render json: Order.find(params[:id]), include: ['line_items.product', 'address', 'orders_status']
  end

  def update
    @order = Order.find(params[:id])

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

  private

  def order_params
    params.require(:order).permit(:orders_status, :name, :delivery_price, :email, :phone, address: [:city, :address])
  end

  def adapted_params
    order_params[:address_attributes] = order_params[:address]
  end

  def set_form
    form_data = {}
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
