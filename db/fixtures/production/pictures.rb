picture_id = 1
4.times do
  Picture.seed do |s|
    s.id = picture_id
    s.product_id = 1
    picture_id += 1
  end
end
