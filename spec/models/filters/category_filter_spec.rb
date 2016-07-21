require 'rails_helper'
Struct.new('Filter', :params, :filters, :products)

RSpec.describe CategoryFilter, type: :model do
  describe 'check methods' do
    let(:category) { create :category }
    let(:product) { create :product, category: category }
    let!(:filter) { Struct::Filter.new({category: category.id }, [], Product.none)}
    let(:category_filter) { CategoryFilter.new(filter)}

    it '#category_id' do
      expect(category_filter.category_id).to eq(category.id)
    end

    it '#filters' do
      expect(category_filter.filters).to eq(filter.filters)
    end

    it '#products' do
      expect(category_filter.products).to eq(category.total_products)
    end
  end
end
