require 'rails_helper'

RSpec.describe Cart, type: :model do
  describe '#total_price' do
    it 'should return total_price' do
      cart = create :cart
      product_1 = create :product, price: 1.5
      line_item_1 = create :line_item, cart: cart, count: 2, product: product_1

      product_2 = create :product, price: 4.5
      line_item_2 = create :line_item, cart: cart, count: 3, product: product_2
      result = product_1.price * line_item_1.count + product_2.price * line_item_2.count
      expect(cart.total_price).to eq(result)
    end
  end

  describe '#total_count' do
    it 'should return total_count' do
      cart = create :cart
      product_1 = create :product
      line_item_1 = create :line_item, cart: cart, count: 2, product: product_1

      product_2 = create :product
      line_item_2 = create :line_item, cart: cart, count: 3, product: product_2
      result = line_item_1.count + line_item_2.count
      expect(cart.total_count).to eq(result)

    end
  end
end
