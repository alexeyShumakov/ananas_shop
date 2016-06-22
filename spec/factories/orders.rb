FactoryGirl.define do
  factory :order do
    user nil
    total_price "9.99"
    name "MyString"
    email "MyString"
    phone "MyString"
    address nil
  end
end
