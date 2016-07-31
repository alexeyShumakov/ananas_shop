class ShortProductSerializer < ActiveModel::Serializer
  attributes :id, :price, :default_thumb_cover_url, :default_medium_cover_url, :title, :description
  has_many :pictures
end
