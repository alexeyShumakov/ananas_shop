picture_id = 1
1.upto(9) do |product_id|
  4.times do
    Picture.seed do |s|
      s.id = picture_id
      s.product_id = product_id
      picture_id += 1
    end
  end
end
