class OrdersStatus < ActiveRecord::Base
  has_many :orders
  validates :color, :title, presence: true
end
