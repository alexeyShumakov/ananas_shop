require 'rails_helper'

RSpec.describe Admin::ProductsController, type: :controller do
  let(:admin) { create :admin_user }
  before(:each) do
    sign_in admin
  end

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'assigns @products' do
      product = create :product
      get :index
      expect(assigns(:products)).to eq [product]
    end
  end

  describe "GET #show" do
    it 'assigns @product' do
      product = create :product
      get :show, { id: product.id }
      expect(assigns(:product)).to eq product
    end
  end
end
