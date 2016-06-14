class Category < ActiveRecord::Base
  has_ancestry
  has_many :products

  def total_products
    @ids = self.descendant_ids << self.id
    Product.where category: @ids
  end
end
