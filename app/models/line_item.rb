class LineItem < ActiveRecord::Base
  belongs_to :cart
  belongs_to :product
  validates :count, numericality: { only_integer: true, greater_than: 0, less_than: 99 }
  validates :count, :product, :cart, presence: true

  def total_price
    count * product.price
  end
end
