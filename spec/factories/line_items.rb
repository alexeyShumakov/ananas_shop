FactoryGirl.define do
  factory :line_item do
    cart
    product
    count 1
  end
end
