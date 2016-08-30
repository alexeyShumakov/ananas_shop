require 'rails_helper'

RSpec.describe OrderPolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:order) { create :order, user: user}

  subject { described_class }

  permissions :show? do
    it 'admin or owner can see model' do
      expect(subject).to  permit(user, order)
      expect(subject).to  permit(admin, order)
    end
  end

  permissions :update? do
    it 'only admin can update model' do
      expect(subject).to  permit(admin, order)
    end
  end

  permissions :confirm? do
    it 'only admin can update model' do
      expect(subject).to  permit(admin, order)
    end
  end

  permissions :notify? do
    it 'only admin can update model' do
      expect(subject).to  permit(admin, order)
    end
  end
end
