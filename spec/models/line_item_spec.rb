require 'rails_helper'

RSpec.describe LineItem, type: :model do
  describe '#total_price' do
    it 'should return total_price' do
      product = create :product, price: 15
      line_item = create :line_item, count: 2, product: product
      expect(line_item.total_price).to eq(15 * 2)
    end
  end

  describe '#fixed_total_price' do
    it 'should return fixed_total_price' do
      line_item = create :line_item, count: 2, fixed_price: 15
      expect(line_item.fixed_total_price).to eq(15 * 2)
    end

  end
end
