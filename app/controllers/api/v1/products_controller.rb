class Api::V1::ProductsController < ApplicationController
  def index
    @products = {products: []}
    if params[:keyword].present?
      @products = Product.search_by_title(params[:keyword]).limit(10)
    elsif params[:category_id].present?
      category = Category.find params[:category_id]
      @products = category.total_products.page(1).per(24)
    end
    render json: @products
  end
end
