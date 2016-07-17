class Api::V1::ProductsController < ApplicationController
  def index
    @products = {products: []}
    if params[:keyword].present?
      @products = Product.search_by_title(params[:keyword]).limit(10)
    end

    if params[:category].present?
      category = Category.find params[:category]
      @products = category.total_products
    end

    if params[:price].present?
      price = params[:price].split(';')
      @products = @products.where 'price >= ? AND price <= ?', price[0], price[1]
    end

    @products = @products.page(params[:page])

    if params[:per].present?
      @products = @products.per(params[:per])
    end

    render json: @products

  end
end
