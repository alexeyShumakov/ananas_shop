require 'rails_helper'
Struct.new('Filter', :params, :filters, :products)

RSpec.describe SearchFilter, type: :model do
  describe 'with params' do
    let!(:product) { create :product, title: 'super title'  }
    let!(:product_1) { create :product, title: 'title'  }
    let!(:filter) { Struct::Filter.new({keyword: 'super' }, [], Product.all)}
    let(:search_filter) { SearchFilter.new(filter)}

    it '#products' do
      expect(search_filter.products).to eq([product])
    end
  end

  describe 'without params' do
    let!(:product) { create :product, title: 'super title'  }
    let!(:product_1) { create :product, title: 'title'  }
    let!(:filter) { Struct::Filter.new({}, [], Product.all)}
    let(:search_filter) { SearchFilter.new(filter)}

    it '#products' do
      expect(search_filter.products).to eq([product, product_1])
    end
  end
end
