class FieldsValue < ActiveRecord::Base
  belongs_to :field
  has_many :products_fields_values
  has_many :products_fields, through: :products_fields_values
  validates :title, :field, presence: true
end
