class LineItemSerializer < ActiveModel::Serializer
  attributes :id, :count, :total_price,
              :cart_id, :fixed_price,
              :fixed_total_price

  has_one :product
end
