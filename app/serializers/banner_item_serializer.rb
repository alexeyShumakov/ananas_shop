class BannerItemSerializer < ActiveModel::Serializer
  attributes :id, :image

  def image
    object.image.url :medium
  end
end
