require 'rails_helper'

RSpec.describe LineItemPolicy do

  let(:user) { create :user }
  let(:admin) { create :admin_user }
  let(:line_item) { create :line_item}

  subject { described_class }

  permissions ".scope" do
  end

  permissions :destroy? do
    it 'admin can create model' do
      expect(subject).to permit(admin, line_item)
    end
  end

  permissions :update? do
    it 'admin can update model' do
      expect(subject).to permit(admin, line_item)
    end
  end

  permissions :destroy? do
  end
end
