require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do

  describe "GET #show" do
    let(:category) { create :category }
    it "returns http success" do
      get :show, { id: category.id }
      expect(response).to have_http_status(:success)
    end

    it "assigns @category" do
      get :show, { id: category.id }
      expect(assigns[:category]).to eq(category)
    end

    it 'assigns @products' do
      product = create :product, category: category
      get :show, { id: category.id }
      expect(assigns(:products)).to eq([product])
    end
  end

end
