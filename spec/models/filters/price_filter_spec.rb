require 'rails_helper'

RSpec.describe PriceFilter, type: :model do
  describe 'with params' do
    let!(:product_1) { create :product, price: 10 }
    let!(:product_2) { create :product, price: 20 }
    let!(:filter) { EmptyFilter.new({ price: '10;15' })}
    let(:price_filter) { PriceFilter.new(filter)}

    it '#price' do
      expect(price_filter.price).to eq(['10', '15'])
    end

    it '#min_b' do
      expect(price_filter.min_b).to eq(10)
    end
    it '#max_b' do
      expect(price_filter.max_b).to eq(15)
    end

    it '#min' do
      expect(price_filter.min).to eq(10)
    end

    it '#max' do
      expect(price_filter.max).to eq(20)
    end

    it '#filters' do
      filters = []
      filters <<
        { type: 'PriceFilter',
          name: 'price',
          params: [10, 15],
          min:  10,
          max:  20,
          minB: 10,
          maxB: 15,
          minFormB: 10,
          maxFormB: 15}
      expect(price_filter.filters).to eq(filters)
    end

    it '#products' do
      expect(price_filter.products).to eq([product_1])
    end
  end

  describe 'without params' do
    let!(:product_1) { create :product, price: 10 }
    let!(:product_2) { create :product, price: 20 }
    let!(:filter) { EmptyFilter.new({})}
    let(:price_filter) { PriceFilter.new(filter)}

    it '#price' do
      expect(price_filter.price).to eq([10, 20])
    end

    it '#min_b' do
      expect(price_filter.min_b).to eq(10)
    end
    it '#max_b' do
      expect(price_filter.max_b).to eq(20)
    end

    it '#min' do
      expect(price_filter.min).to eq(10)
    end

    it '#max' do
      expect(price_filter.max).to eq(20)
    end

    it '#filters' do
      filters = []
      filters <<
        { type: 'PriceFilter',
          name: 'price',
          params: [],
          min:  10,
          max:  20,
          minB: 10,
          maxB: 20,
          minFormB: 10,
          maxFormB: 20}
      expect(price_filter.filters).to eq(filters)
    end

    it '#products' do
      expect(price_filter.products).to eq([product_1, product_2])
    end
  end
end
