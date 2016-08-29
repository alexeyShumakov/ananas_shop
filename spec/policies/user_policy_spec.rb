require 'rails_helper'

RSpec.describe UserPolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }

  subject { described_class }


  permissions :update? do
    it 'only admin can update model' do
      expect(subject).to  permit(admin, user)
    end

    it 'user can`t update model' do
      expect(subject).not_to  permit(user, user)
    end
  end
end
