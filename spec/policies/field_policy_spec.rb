require 'rails_helper'

RSpec.describe FieldPolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:field) { create :field }

  subject { described_class }


  permissions :show? do
  end

  permissions :index? do
    it 'admin can get index model' do
      expect(subject).to permit(admin, Field)
    end

    it 'user can`t get index model' do
      expect(subject).not_to permit(user, Field)
    end
  end

  permissions :create? do
    it 'admin can create model' do
      expect(subject).to permit(admin, Field)
    end

    it 'user can`t create model' do
      expect(subject).not_to permit(user, Field)
    end
  end


  permissions :destroy? do
  end
end
