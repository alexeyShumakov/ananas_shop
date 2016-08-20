class Order < ActiveRecord::Base
  belongs_to :orders_status
  belongs_to :user
  belongs_to :address
  has_many :line_items

  enum status: [:in_proccess, :delivering, :done, :abort]
  validates :email, :phone, :name, presence: true

  def fixed_total_price
    line_items.to_a.sum(&:fixed_total_price) + delivery_price
  end

  def total_count
    line_items.sum :count
  end
end
