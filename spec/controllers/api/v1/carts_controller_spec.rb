require 'rails_helper'

RSpec.describe Api::V1::CartsController, type: :controller do
  describe 'GET #show' do
    it 'show cart finded by cookies value' do
      cart = create :cart
      request.cookies[:cart_id] = cart.id
      get :show, { id: cart.id }
      expect(assigns(:cart)).to eq(cart)
    end
  end
end
