class LineItemSerializer < ActiveModel::Serializer
  attributes :id, :count, :total_price, :cart_id, :product_id
end
