product_id = 1
1.upto(9) do |category_id|
  400.times do
    Product.seed do |s|
      s.id = product_id
      s.category_id = category_id
      s.title = Faker::Commerce.product_name
      s.price = Faker::Commerce.price
      s.description = Faker::Hipster.paragraph
      product_id += 1
    end
  end
end
