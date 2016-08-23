require 'rails_helper'

RSpec.describe Api::V1::BannerItemsController, type: :controller do
  let(:user) { create :user }
  let(:admin) { create :admin_user }
  describe 'POST #create' do
    it 'create banner_item' do
      sign_in admin
      image = fixture_file_upload('test.png', 'image/png')
      expect { post :create, banner_item: { image: image } }.to change(BannerItem, :count).by(1)
    end

    it 'only admin can create banner item' do
      sign_in user
      image = fixture_file_upload('test.png', 'image/png')
      expect { post :create, banner_item: { image: image } }.to raise_error(Pundit::NotAuthorizedError)
    end
  end
  describe 'DELETE #destroy' do
    it 'destroy banner_item' do
      banner = create :banner_item
      sign_in admin
      expect { delete :destroy, id: banner.id }.to change(BannerItem, :count).by(-1)
    end

    it 'only admin can destroy banner item' do
      banner = create :banner_item
      sign_in user
      expect { delete :destroy, id: banner.id }.to raise_error(Pundit::NotAuthorizedError)
    end
  end
end
