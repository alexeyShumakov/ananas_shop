class ProductsFieldsValue < ActiveRecord::Base
  belongs_to :products_field
  belongs_to :fields_value
end
