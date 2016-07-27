class Picture < ActiveRecord::Base
  belongs_to :product
  has_attached_file :image, styles: { medium: "500x500#", thumb: "200x200#" }, default_url: "/images/image/:style/missing.png"
  validates_attachment_size :image, less_than: 5.megabytes
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
