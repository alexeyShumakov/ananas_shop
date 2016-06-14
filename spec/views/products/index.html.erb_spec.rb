require 'rails_helper'

RSpec.describe "products/index", type: :view do
  let(:products) {[create(:product)]}
  it "renders a list of products" do
    stub_template '_categories_bar.html.erb' => 'sidebar'
    stub_template '_pager.html.erb' => 'pager'
    assign(:products, products)
    render
    expect(rendered).to match(products.first.title)
    expect(rendered).to match(products.first.price.to_s)
  end
end
