require 'rails_helper'
Struct.new('Filter', :params, :filters, :products)

RSpec.describe BaseFilter, type: :model do
  describe 'check methods' do
    let!(:filter) { Struct::Filter.new('params', 'filters', 'products')}
    let(:base_filter) { BaseFilter.new(filter)}
    it '#params' do
      expect(base_filter.params).to eq(filter.params)
    end

    it '#filters' do
      expect(base_filter.filters).to eq(filter.filters)
    end

    it '#products' do
      expect(base_filter.products).to eq(filter.products)
    end
  end
end
