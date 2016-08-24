require 'rails_helper'

RSpec.describe CategoryPolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:category) { create :category }

  subject { described_class }

  permissions ".scope" do
  end

  permissions :create? do
    it 'admin can create model' do
      expect(subject).to permit(admin, Category)
    end

    it 'user can`t create model' do
      expect(subject).not_to permit(user, Category)
    end
  end

  permissions :update? do
    it 'admin can update model' do
      expect(subject).to permit(admin, category)
    end

    it 'user can`t update model' do
      expect(subject).not_to permit(user, category)
    end
  end

  permissions :destroy? do
    it 'admin can destroy model' do
      expect(subject).to permit(admin, category)
    end

    it 'user can`t destroy model' do
      expect(subject).not_to permit(user, category)
    end
  end
end
