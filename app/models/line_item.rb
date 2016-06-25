class LineItem < ActiveRecord::Base
  default_scope { order('created_at DESC') }
  belongs_to :cart
  belongs_to :product
  belongs_to :order
  validates :count, numericality: { only_integer: true, greater_than: 0, less_than: 99 }
  validates :count, :product, presence: true

  def total_price
    count * product.price
  end

  def fixed_total_price
    count * fixed_price
  end
end
