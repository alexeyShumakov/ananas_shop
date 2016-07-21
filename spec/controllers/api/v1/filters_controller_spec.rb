require 'rails_helper'

RSpec.describe Api::V1::FiltersController, type: :controller do

  describe "GET #index" do
    let!(:product_1) { create :product, price: 15}
    it "returns http success" do
      get :index, { category: '1'}
      expect(response).to have_http_status(:success)
    end

    it "returns standard filters" do
      get :index
      expect(response).to have_http_status(:success)
      expect(assigns(:filters).result.filters).not_to be_empty
    end
  end

end
