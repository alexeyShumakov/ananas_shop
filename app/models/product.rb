class Product < ActiveRecord::Base
  include PgSearch

  validates :category, :title, :price, presence: true

  pg_search_scope :search_by_title,
    against: :title,
    using: {tsearch: {prefix: true}}

  paginates_per 24
  belongs_to :category
  has_many :pictures
  has_many :line_items

  def cover_url(style = 'thumb')
    pic = pictures.find_by(is_hover: true) || pictures.last || Picture.new
    pic.image.url(style)
  end
end
