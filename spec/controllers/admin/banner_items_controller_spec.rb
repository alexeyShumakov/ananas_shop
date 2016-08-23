require 'rails_helper'

RSpec.describe Admin::BannerItemsController, type: :controller do
  let(:admin) { create :admin_user }
  describe "GET #index" do
    before(:each) do
      sign_in admin
    end
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

end
