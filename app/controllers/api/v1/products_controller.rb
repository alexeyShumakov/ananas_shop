class Api::V1::ProductsController < ApplicationController
  def index
    @products = {products: []}
    if params[:keyword].present?
      @products = Product.search_by_title(params[:keyword]).limit(10)
    end

    if params[:category_id].present?
      category = Category.find params[:category_id]
      @products = category.total_products.page(1).per(24)
    end

    if params[:price].present?
      price = params[:price].split(';')
      puts price
      @products = @products.where 'price >= ? AND price <= ?', price[0], price[1]
    end

    render json: @products
  end
end
