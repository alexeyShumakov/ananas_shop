require 'rails_helper'

RSpec.describe Api::V1::FieldsController, type: :controller do
  let(:user) { create :user }
  let(:admin) { create :admin_user }

  before(:each) do
    sign_in admin
  end

  describe 'GET #index' do
    it 'admin can get index' do
      field = create :field
      get :index
      expect(response).to have_http_status(:success)
      expect(assigns(:fields)).to eq([field])
    end

    describe 'POST #create' do
      it 'is Field object' do
        title = 'title'
        post :create, field: {title: title}
        expect(assigns(:field)).to be_instance_of Field

      end
      it 'create field with params' do
        title = 'title'
        post :create, field: {title: title}
        expect(assigns(:field).title).to eq title
      end
    end
  end
end
