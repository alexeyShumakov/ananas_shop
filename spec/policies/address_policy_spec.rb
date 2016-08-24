require 'rails_helper'

RSpec.describe AddressPolicy do

  let(:user) { create :user }
  let(:user_1) { create :user }
  let(:admin) { create :admin_user }
  let(:address) { create(:address, user: user)}

  subject { described_class }

  permissions :create? do
  end

  permissions :update? do
    it 'admin can update all addresses' do
      expect(subject).to permit(admin, address)
    end

    it 'owner can update his addresses' do
      expect(subject).to permit(user, address)
    end

    it 'user cant update not his addresses' do
      expect(subject).not_to permit(user_1, address)
    end
  end

  permissions :destroy? do
    it 'admin can destroy all addresses' do
      expect(subject).to permit(admin, address)
    end

    it 'owner can destroy his addresses' do
      expect(subject).to permit(user, address)
    end

    it 'user cant destroy not his addresses' do
      expect(subject).not_to permit(user_1, address)
    end
  end
end
