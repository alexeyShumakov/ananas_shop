class Product < ActiveRecord::Base
  include PgSearch

  belongs_to :category
  has_many :pictures
  has_many :line_items
  has_many :products_fields

  validates :category, :title, :price, :description, presence: true

  pg_search_scope :search_by_title,
    against: :title,
    using: {tsearch: {prefix: true}}

  paginates_per 24

  def cover_url(style = 'thumb')
    pic = pictures.find_by(is_hover: true) || pictures.first || Picture.new
    pic.image.url(style)
  end

  def default_thumb_cover_url
    Picture.new.image.url('thumb')
  end

  def default_medium_cover_url
    Picture.new.image.url('medium')
  end
end
