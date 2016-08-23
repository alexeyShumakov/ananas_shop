require 'rails_helper'

RSpec.describe SortFilter, type: :model do
  describe 'with params' do
    let!(:product_1) { create :product, price: 1 }
    let!(:product_2) { create :product, price: 2 }
    let!(:filter) { EmptyFilter.new({ sort: 'price' })}
    let(:sort_filter) { SortFilter.new(filter)}

    it '#sort?' do
      expect(sort_filter.sort?).to eq(true)
    end

    it '#sort' do
      expect(sort_filter.sort).to eq('price')
    end


    it '#filters' do
      filters = [{
        type: 'SortFilter',
        name: 'sort',
        params: ['price'],
        sort: 'price',
        orders:
          [{ title: 'цене ',
              values: [
                { title: 'цене↑', name: 'price asc' },
                { title: 'цене↓', name: 'price desc' }
              ]
            }, {
              title: 'обновлению',
              values: [ { title: 'обновлению', name: 'updated_at desc' } ]
            }]

      }]
      expect(sort_filter.filters).to eq(filters)
      expect(sort_filter.filters).to eq(filter.filters)
    end

    it '#products' do
      expect(sort_filter.products).to eq([product_1, product_2])
    end
  end

  describe 'without params' do
    let!(:product_1) { create :product, price: 1 }
    let!(:product_2) { create :product, price: 2 }
    let!(:filter) { EmptyFilter.new({})}
    let(:sort_filter) { SortFilter.new(filter)}

    it '#sort?' do
      expect(sort_filter.sort?).to eq(false)
    end

    it '#sort' do
      expect(sort_filter.sort).to eq('updated_at desc')
    end


    it '#filters' do
      filters = [{
        type: 'SortFilter',
        name: 'sort',
        params: [],
        sort: 'updated_at desc',
        orders:
          [{ title: 'цене ',
              values: [
                { title: 'цене↑', name: 'price asc' },
                { title: 'цене↓', name: 'price desc' }
              ]
            }, {
              title: 'обновлению',
              values: [ { title: 'обновлению', name: 'updated_at desc' } ]
            }]
      }]
      expect(sort_filter.filters).to eq(filters)
      expect(sort_filter.filters).to eq(filter.filters)
    end

    it '#products' do
      expect(sort_filter.products).to eq([product_2, product_1])
    end
  end
end
