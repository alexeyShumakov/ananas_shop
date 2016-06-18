class Api::V1::ProductsController < ApplicationController
  def index
    @products = Product.search_by_title(params[:keyword]).limit(10)
    render json: @products
  end
end
