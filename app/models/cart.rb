class Cart < ActiveRecord::Base
  has_many :line_items

  def total_count
    line_items.sum :count
  end

  def total_price
    line_items.to_a.sum(&:total_price)
  end
end
