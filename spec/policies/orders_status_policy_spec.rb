require 'rails_helper'

RSpec.describe OrdersStatusPolicy do
  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:orders_status) { create :orders_status}

  subject { described_class }

  permissions :show? do
    it 'only admin can see model' do
      expect(subject).to  permit(admin, orders_status)
    end
  end

  permissions :update? do
    it 'only admin can update model' do
      expect(subject).to  permit(admin, orders_status)
    end
  end

  permissions :index? do
    it 'only admin can get index' do
      expect(subject).to  permit(admin, orders_status)
    end
  end

  permissions :destroy? do
    it 'only admin can destroy' do
      expect(subject).to  permit(admin, orders_status)
    end
  end
end
