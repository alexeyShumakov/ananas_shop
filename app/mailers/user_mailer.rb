class UserMailer < ApplicationMailer
  def new_order(order_id)
    @order = Order.find order_id
    mail to: @order.email, subject: 'Ананас.ру Ваш заказ'
  end

  def order_admin_notification(order_id, admin_id)
    @order = Order.find order_id
    @admin = User.find admin_id
    subject = "Некий #{@order.name} совершил заказ на #{ @order.fixed_total_price}"
    mail to: @admin.email, subject: subject
  end
end
