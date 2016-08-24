require 'rails_helper'

RSpec.describe BannerItemPolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:banner_item) { create :banner_item }

  subject { described_class }

  permissions ".scope" do
  end

  permissions :create? do
    it 'admin can create banner_item' do
      expect(subject).to permit(admin, banner_item)
    end

    it 'user can`t create banner_item' do
      expect(subject).not_to permit(user, banner_item)
    end
  end

  permissions :update? do
  end

  permissions :destroy? do
    it 'admin can destroy banner_item' do
      expect(subject).to permit(admin, banner_item)
    end

    it 'user can`t destroy banner_item' do
      expect(subject).not_to permit(user, banner_item)
    end
  end
end
