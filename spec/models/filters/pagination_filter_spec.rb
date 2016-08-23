require 'rails_helper'

RSpec.describe PaginationFilter, type: :model do
  describe 'with params' do
    let!(:product_1) { create :product }
    let!(:product_2) { create :product }
    let!(:filter) { EmptyFilter.new({page: 1, per: 4 })}
    let(:pagination_filter) { PaginationFilter.new(filter)}

    it '#page' do
      expect(pagination_filter.page).to eq(1)
    end

    it '#per_page' do
      expect(pagination_filter.per_page).to eq(4)
    end

    it '#filters' do
      expect(pagination_filter.filters).to eq(filter.filters)
    end

    it '#products' do
      expect(pagination_filter.products).to eq(filter.products.page(1).per(4))
    end
  end

  describe 'without params' do
    let!(:product_1) { create :product }
    let!(:product_2) { create :product }
    let!(:filter) { EmptyFilter.new({})}
    let(:pagination_filter) { PaginationFilter.new(filter)}

    it '#page' do
      expect(pagination_filter.page).to eq(nil)
    end

    it '#per_page' do
      expect(pagination_filter.per_page).to eq(nil)
    end

    it '#filters' do
      filters = []
      filters <<
        {
          type: 'PageFilter',
          name: 'page',
          params: [],
          page: 1,
          totalPages: 1,
          totalCount: 2
        }
      filters <<
        {
          type: 'PageSizeFilter',
          name: 'per',
          params:[],
          size: 24
        }
      expect(pagination_filter.filters).to eq(filters)
      expect(pagination_filter.filters).to eq(filter.filters)
    end

    it '#products' do
      expect(pagination_filter.products).to eq(filter.products.page(nil).per(nil))
    end
  end
end
