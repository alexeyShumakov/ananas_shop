class CreateLineItem < Mutations::Command
  required do
    model :product
    integer :count
  end

  optional do
    model :cart
    integer :order_id
    string :fixed_price
    model :user
  end

  def execute
    order = Order.find_by(id: inputs[:order_id]) if user && user.admin?
    cart = inputs[:cart]
    cart = nil if order.present?

    li_params = {
      count: inputs[:count],
      product: inputs[:product],
      fixed_price: inputs[:fixed_price],
      cart: cart,
      order: order
    }
    line_item = LineItem.find_by cart: cart, product: inputs[:product], order: order
    if line_item.present?
      line_item.count += inputs[:count]
    else
      line_item = LineItem.new li_params
    end
    line_item.save
    line_item
  end
end
