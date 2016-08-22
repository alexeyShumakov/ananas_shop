class Category < ActiveRecord::Base
  has_ancestry
  has_many :products

  validates :title, presence: true

  def total_products(products = Product.all)
    @ids = self.descendant_ids << self.id
    products.where category: @ids
  end

  def tree_name
    name = ''
    ancestors.each { |a| name += "#{a.title} > " }
    name += "#{title}"
  end
end
