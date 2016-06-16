class CartSerializer < ActiveModel::Serializer
  attributes :id, :total_count, :total_price
end
