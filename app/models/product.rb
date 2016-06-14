class Product < ActiveRecord::Base
  paginates_per 7 
  belongs_to :category
  has_many :pictures

  def cover_url(style)
    pic = pictures.first
    pic.present? ? pic.image.url(style) : Picture.new.image.url(style)
  end
end
