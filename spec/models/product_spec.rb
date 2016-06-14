require 'rails_helper'

RSpec.describe Product, type: :model do
  let(:product) { create :product }
  describe '#cover_url' do
    it 'return first img path' do
      picture = create :picture, product_id: product.id
      create :picture, product_id: product.id
      expect(product.cover_url(:medium)).to eq(picture.image.url(:medium))
    end

    it 'return missing img path' do
      expect(product.cover_url(:medium)).to eq(Picture.new.image.url(:medium))
    end
  end
end
