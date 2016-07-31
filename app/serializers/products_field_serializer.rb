class ProductsFieldSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :product_id
  has_one :field
  has_many :fields_values
end
