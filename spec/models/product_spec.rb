require 'rails_helper'

RSpec.describe Product, type: :model do
  let(:category) { create :category}
  let(:product) { create :product, category: category }
  let(:product_1) { create :product, category: category }
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

  describe '#similar' do
    it 'return similar product' do
      expect(product.similar).to eq([product_1])
    end

    it 'maximum length = 5' do
      20.times { create :product, category: category }
      expect(product.similar.size).to eq 5
    end
  end
end
