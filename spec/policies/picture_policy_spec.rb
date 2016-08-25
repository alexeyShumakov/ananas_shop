require 'rails_helper'

RSpec.describe PicturePolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:picture) { create :picture}

  subject { described_class }

  permissions :update? do
    it 'only admin can update model' do
      expect(subject).to  permit(admin, picture)
    end
  end

  permissions :create? do
    it 'only admin can create' do
      expect(subject).to  permit(admin, picture)
    end
  end

  permissions :destroy? do
    it 'only admin can destroy' do
      expect(subject).to  permit(admin, picture)
    end
  end
end
