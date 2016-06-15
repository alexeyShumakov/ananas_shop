require 'rails_helper'

RSpec.describe ProductsController, type: :controller do
  describe 'GET #show' do
    it 'assigns @product' do
      product = create(:product)
      get :show, { id: product.id }
      expect(assigns(:product)).to eq(product)
    end
  end

  describe 'GET #index' do
    it 'assigns @products' do
      product = create(:product)
      get :index
      expect(assigns(:products)).to eq([product])
    end
  end
end
