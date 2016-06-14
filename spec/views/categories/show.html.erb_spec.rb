require 'rails_helper'

RSpec.describe "categories/show.html.erb", type: :view do
  let(:category) { create :category }
  let(:products) { [create(:product)]}
  it 'show title' do
    stub_template '_categories_bar.html.erb' => 'sidebar'
    stub_template '_pager.html.erb' => 'pager'
    assign(:category, category)
    assign(:products, products)
    render
    expect(rendered).to match(category.title)
  end

end
