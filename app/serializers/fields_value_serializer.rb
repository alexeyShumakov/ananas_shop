class FieldsValueSerializer < ActiveModel::Serializer
  attributes :id, :title
  belongs_to :field_id
end
