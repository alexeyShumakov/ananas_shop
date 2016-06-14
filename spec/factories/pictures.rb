include ActionDispatch::TestProcess
FactoryGirl.define do
  factory :picture do
    product
    image { fixture_file_upload(Rails.root.join('spec', 'images', 'test.png'), 'image/png') }
  end
end
