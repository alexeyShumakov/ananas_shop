class ProductsField < ActiveRecord::Base
  belongs_to :product
  belongs_to :field

  has_many :products_fields_values, dependent: :destroy
  has_many :fields_values, through: :products_fields_values
end
