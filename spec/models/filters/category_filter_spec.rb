require 'rails_helper'

RSpec.describe CategoryFilter, type: :model do
  describe 'check methods' do
    let!(:category) { create :category }
    let!(:product) { create :product, category: category }
    let!(:filter) { EmptyFilter.new({category: category.id})}
    let!(:category_filter) { CategoryFilter.new(filter)}

    it '#category_id' do
      expect(category_filter.category_id).to eq(category.id)
    end

    it '#filters' do
      expect(category_filter.filters).to eq(filter.filters)
    end

    it '#products' do
      expect(category_filter.products).to eq([product])
    end
  end
end
