require 'rails_helper'

RSpec.describe "products/show", type: :view do
  let(:product) {create(:product)}

  it "renders attributes" do
    stub_template '_breadcrumb.html.erb' => 'breadcrumb'
    assign(:product, product)
    render
    expect(rendered).to match(product.title)
  end
end
