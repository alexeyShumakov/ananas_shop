class Field < ActiveRecord::Base
  has_many :fields_values
  has_many :products_fields
end
