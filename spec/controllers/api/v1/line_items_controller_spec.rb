require 'rails_helper'

RSpec.describe Api::V1::LineItemsController, type: :controller do
  let!(:product) { create :product }
  let(:user) { create :user }
  let(:admin) { create :admin_user }

  describe '#POST create' do
    it 'create new line_item' do
      post :create, { product_id: product.id, count: 2 }
      expect(assigns(:line_item).count).to eq(2)
      expect(assigns(:line_item).product).to eq(product)
    end

    it 'set line_item.order if user.admin' do
      order = create :order
      sign_in admin
      post :create, { product_id: product.id, count: 2, order_id: order.id }
      expect(assigns(:line_item).order).to eq(order)
    end

    it 'not set line_item.order if user not admin' do
      order = create :user
      sign_in admin
      post :create, { product_id: product.id, count: 2, order_id: order.id }
      expect(assigns(:line_item).order).to eq(nil)

    end

    it 'set default count value' do
      post :create, { product_id: product.id }
      expect(assigns(:line_item).count).to eq(1)
    end

    it 'return not found error if have not product_id' do
      expect{post(:create)}.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'return not found error if we have bad product_id' do
      expect{post(:create, product_id: 15)}.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'update count' do
      cart = create :cart
      line_item = create :line_item , count: 1, cart: cart, product: product
      request.cookies['cart_id'] = cart.id

      post :create, { product_id: product.id, count: 2 }

      expect(assigns(:line_item).count).to eq(3)
      expect(assigns(:line_item).product).to eq(product)
    end

    describe 'invalid params' do
      it 'render errors' do
        post :create, { product_id: product.id, count: -20 }
        expect(assigns(:line_item)).to be_invalid
      end
    end
  end

  describe '#DELETE destroy' do
    it 'destroy line_item by id' do
      cart = create :cart
      line_item = create :line_item, count: 1, cart: cart, product: product
      request.cookies['cart_id'] = cart.id
      expect { delete :destroy, id: line_item.id}.to change(LineItem, :count).by(-1)
    end

    it 'return not found error if we have bad id' do
      expect{delete(:destroy, id: 15)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
