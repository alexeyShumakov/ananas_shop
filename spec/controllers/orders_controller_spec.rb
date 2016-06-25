require 'rails_helper'

RSpec.describe OrdersController, type: :controller do

  describe 'POST #create' do
    let!(:cart) { create :cart }
    let!(:line_item_1) { create :line_item, cart: cart, count: 4}
    let!(:line_item_2) { create :line_item, cart: cart, count: 2}

    before(:each) do
      @request.cookies[:cart_id] = cart.id
    end

    describe 'with valid params' do
      let(:valid_params) do
        {
          name: 'jon',
          email: 'email@m.com',
          phone: '123',
          address_attributes: {
            city: 'Moscow',
            address: '1'
          }
        }
      end

      it 'add line_items to order' do
        cart_total_price = line_item_1.total_price + line_item_2.total_price
        cart_total_count = line_item_1.count + line_item_2.count
        post :create, order: valid_params
        expect(Order.last.fixed_total_price).to eq(cart_total_price)
        expect(Order.last.total_count).to eq(cart_total_count)
      end

      it 'after, cart must be empty' do
        post :create, order: valid_params
        expect(assigns(:cart).total_count).to eq(0)
      end

      it 'add user to order' do
        user = create :user
        sign_in user
        post :create, order: valid_params
        expect(Order.last.user).to eq(user)
      end

      it 'add user to address' do
        user = create :user
        sign_in user
        post :create, order: valid_params
        expect(Address.last.user).to eq(user)
      end

      it 'create new OrderForm and it valid' do
        post :create, order: valid_params
        expect(Order.first.address).to eq(Address.first)
        expect(assigns(:form)).to be_kind_of(OrderForm)
        expect(assigns(:form).valid?).to be true
      end

      it 'should add order row to db' do
        expect{ post :create, order: valid_params}.to change(Order, :count).by(1)
      end

      it 'should add address row to db' do
        expect{ post :create, order: valid_params}.to change(Address, :count).by(1)
      end
    end

    describe 'with invalid params' do
      let(:invalid_params) do
        {
          name: '',
          email: 'email@m.com',
          phone: '123',
          address_attributes: {
            city: 'M',
            address: '1'
          }
        }
      end
      it 'create new OrderForm and it invalid' do
        post :create, order: invalid_params
        expect(assigns(:form)).to be_kind_of(OrderForm)
        expect(assigns(:form).valid?).to be false
      end

      it 'not change orders table' do
        expect{ post :create, order: invalid_params}.to change(Order, :count).by(0)
      end

      it 'not change addresses table' do
        expect{ post :create, order: invalid_params}.to change(Address, :count).by(0)
      end
    end
  end

  describe 'GET #new' do
    it 'returns http success' do
      get :new
      expect(response).to have_http_status(:success)
    end
  end
end
