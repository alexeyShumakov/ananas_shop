class UserMailer < ApplicationMailer
  def new_order(order)
    @order = order

    mail to: @order.email, subject: 'Ананас.ру Ваш заказ'
  end
end
