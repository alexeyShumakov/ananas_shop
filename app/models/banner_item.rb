class BannerItem < ActiveRecord::Base
  default_scope {order('created_at DESC')}
  has_attached_file :image, styles: { medium: "1200x150#" }, default_url: "/images/image/:style/missing.png"
  validates_attachment_size :image, less_than: 5.megabytes
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
