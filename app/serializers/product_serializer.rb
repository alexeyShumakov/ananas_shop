class ProductSerializer < ActiveModel::Serializer
  attributes :id, :price, :thumb_cover_url, :medium_cover_url, :title, :description
  has_many :pictures
  has_many :products_fields
  has_one :category

  def thumb_cover_url
    object.cover_url(:thumb)
  end

  def medium_cover_url
    object.cover_url(:medium)
  end

  def pictures
    object.pictures.order(:created_at)
  end
end
