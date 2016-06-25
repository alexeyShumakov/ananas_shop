require 'rails_helper'

RSpec.describe Order, type: :model do
  describe '#fixed_total_price' do
    it 'should return fixed_total_price' do
      order = create :order
      line_item_1 = create :line_item, order: order, fixed_price: 15, count: 3
      line_item_2 = create :line_item, order: order, fixed_price: 15, count: 5
      result = line_item_1.fixed_price * line_item_1.count + line_item_2.fixed_price * line_item_2.count
      expect(order.fixed_total_price).to eq(result)
    end
  end
end
