class Field < ActiveRecord::Base
  has_many :fields_values
  has_many :products_fields

  validates :title, presence: true
end
