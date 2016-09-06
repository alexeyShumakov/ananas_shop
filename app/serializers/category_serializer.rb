class CategorySerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :children, serializer: CategorySerializer
end
