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
    UserMailer.new_order(order).deliver_later
  end
end
