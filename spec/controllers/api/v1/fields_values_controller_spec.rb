require 'rails_helper'

RSpec.describe Api::V1::FieldsValuesController, type: :controller do
  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:field) { create :field }
  let(:product) { create :product }
  let(:valid_params) {{ title: 'title', field_id: field.id}}
  let(:invalid_params) {{ title: '', field_id: field.id}}

  before(:each) do
    sign_in admin
  end

  describe 'POST #create' do
    it 'is have succes request with valid params' do
      post :create, fields_value: valid_params, product_id: product.id
      expect(response).to have_http_status(:success)
    end

    it 'is FieldsValue object' do
      post :create, fields_value: valid_params, product_id: product.id
      expect(assigns(:fields_value)).to be_instance_of FieldsValue

    end
    it 'create field with params' do
      post :create, fields_value: valid_params, product_id: product.id
      expect(assigns(:fields_value).title).to eq valid_params[:title]
    end

    it 'is have unprocessable_entity request status with invalid params' do
      post :create, fields_value: invalid_params, product_id: product.id
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
