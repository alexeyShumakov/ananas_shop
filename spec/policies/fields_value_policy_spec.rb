require 'rails_helper'

RSpec.describe FieldsValuePolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:fields_value) { create :fields_value }

  subject { described_class }

  permissions ".scope" do
  end

  permissions :create? do
    it 'admin can create model' do
      expect(subject).to permit(admin, FieldsValue)
    end

    it 'user can`t create model' do
      expect(subject).not_to permit(user, FieldsValue)
    end
  end
end
