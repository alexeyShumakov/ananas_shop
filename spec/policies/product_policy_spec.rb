require 'rails_helper'

RSpec.describe ProductPolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:product) { create :product}

  subject { described_class }

  permissions :update? do
    it 'only admin can update model' do
      expect(subject).to  permit(admin, product)
    end
  end

  permissions :create? do
    it 'only admin can create' do
      expect(subject).to  permit(admin, product)
    end
  end
end
