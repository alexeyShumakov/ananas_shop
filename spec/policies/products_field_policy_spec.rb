require 'rails_helper'

RSpec.describe ProductsFieldPolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:products_field) { create :products_field}

  subject { described_class }

  permissions :update? do
    it 'only admin can update model' do
      expect(subject).to  permit(admin, products_field)
    end
  end

  permissions :create? do
    it 'only admin can create' do
      expect(subject).to  permit(admin, products_field)
    end
  end

  permissions :destroy? do
    it 'only admin can destroy' do
      expect(subject).to  permit(admin, products_field)
    end
  end
end
