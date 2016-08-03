class FullCategorySerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :ancestors, serializer: CategorySerializer
end
