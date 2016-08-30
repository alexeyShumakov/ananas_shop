class OrderMailer < ApplicationMailer

  def confirm(order_id)
    @order = Order.find order_id
    mail to: @order.email, subject: "Заказ №#{order_id} подтвержден"
  end

  def notify(order_id)
    @order = Order.find order_id
    mail to: @order.email, subject: "Заказ №#{order_id}, статус: #{@order.orders_status.title}"
  end
end
