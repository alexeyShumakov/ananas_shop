FactoryGirl.define do
  factory :banner_item do
    image { fixture_file_upload(Rails.root.join('spec', 'images', 'test.png'), 'image/png') }
  end
end
