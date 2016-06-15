FactoryGirl.define do
  factory :line_item do
    cart
    product
    price "9.99"
    count 1
  end
end
