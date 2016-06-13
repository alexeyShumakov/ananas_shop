require 'rails_helper'

RSpec.describe "categories/show.html.erb", type: :view do
  let(:category) { create :category }
  it 'show title' do
    assign(:category, category)
    render
    expect(rendered).to match(category.title)
  end

end
