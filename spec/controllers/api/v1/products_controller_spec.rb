require 'rails_helper'

RSpec.describe Api::V1::ProductsController, type: :controller do
  describe 'GET #index' do
    it 'assigns @products' do
      product = create(:product, title: 'Ananas')
      get :index, { keyword: 'ananas' }
      expect(assigns(:products)).to eq([product])
    end
    it 'products are empty array' do
      product = create(:product, title: 'Tomato')
      get :index, { keyword: 'ananas' }
      expect(assigns(:products)).to eq([])
    end
  end
end
