class ProductSerializer < ActiveModel::Serializer
  attributes :id, :price, :thumb_cover_url, :medium_cover_url, :title

  def thumb_cover_url
    object.cover_url(:thumb)
  end

  def medium_cover_url
    object.cover_url(:medium)
  end
end
