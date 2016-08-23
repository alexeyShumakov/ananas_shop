require 'rails_helper'

RSpec.describe BaseFilter, type: :model do
  describe 'check methods' do
    let!(:filter) { EmptyFilter.new({number: 42})}
    let(:base_filter) { BaseFilter.new(filter)}
    it '#params' do
      expect(base_filter.params).to eq(filter.params)
    end
  end
end
