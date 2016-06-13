require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do

  describe "GET #show" do
    let(:category) { create :category }
    it "returns http success" do
      get :show, { id: category.id }
      expect(response).to have_http_status(:success)
    end

    it "assigns @category" do
      category = create :category
      get :show, { id: category.id }

      expect(assigns[:category]).to eq(category)
    end
  end

end
