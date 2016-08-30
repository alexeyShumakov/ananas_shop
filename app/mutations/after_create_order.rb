class AfterCreateOrder < Mutations::Command
  required do
    model :order
    model :cart
  end

  def execute
    cart = inputs[:cart]
    order = inputs[:order]
    cart.line_items.each do |line_item|
      line_item.fixed_price = line_item.product.price
      line_item.order = order
      line_item.cart = nil
      line_item.save
    end
    cart.reload
    order.reload
    UserMailer.delay.new_order(order.id)
    User.where(role: 1).each do |admin|
      UserMailer.delay.order_admin_notification(order.id, admin.id)
    end
  end
end
