require 'rails_helper'
RSpec.describe EmptyFilter, type: :model do
  describe 'check methods' do
    let(:empty_filter) { EmptyFilter.new({number: 42}) }

    it '#initialize' do
      expect(empty_filter.products).to eq(Product.none)
      expect(empty_filter.filters).to eq([])
      expect(empty_filter.params).to eq({number: 42})
    end
  end
end
