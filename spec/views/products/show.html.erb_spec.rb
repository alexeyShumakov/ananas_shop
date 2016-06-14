require 'rails_helper'

RSpec.describe "products/show", type: :view do
  let(:product) {create(:product)}

  it "renders attributes" do
    assign(:product, product)
    render
    expect(rendered).to match(product.title)
  end
end
