class FieldSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :fields_values
end
