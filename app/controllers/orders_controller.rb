class OrdersController < ApplicationController
  before_action :set_form

  def new
    if @cart.empty?
      redirect_to root_path, notice: 'Ваша корзину пуста, прикупите что-нибудь.'
    end
  end

  def create
    if @form.validate(order_params)
      @form.save
      AfterCreateOrder.run(order: @form.model, cart: @cart)
      redirect_to root_path, notice: 'Отлично, вы успешно сделали заказ, мы с вами свяжемся в ближайшее время.'
    else
      render :new
    end
  end

  private

  def order_params
    params.require(:order).permit(:name, :email, :phone, address_attributes: [:city, :address])
  end

  def set_form
    address = Address.new(user: current_user)
    order = Order.new(address: address, user: current_user)
    @form = OrderForm.new order
  end
end

