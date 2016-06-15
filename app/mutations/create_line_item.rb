class CreateLineItem < Mutations::Command
  required do
    model :cart
    model :product
    integer :count
  end
  def execute
    line_item = LineItem.find_by cart: inputs[:cart], product: inputs[:product]
    if line_item.present?
      line_item.count += inputs[:count]
    else
      line_item = LineItem.new inputs
    end
    line_item.save
    line_item
  end
end
