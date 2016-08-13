class Address < ActiveRecord::Base
  belongs_to :user
  has_many :orders
  validates :address, :city, presence: true
end
