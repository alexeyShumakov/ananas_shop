class LineItemSerializer < ActiveModel::Serializer
  attributes :id, :count, :total_price, :cart_id
  has_one :product
end
