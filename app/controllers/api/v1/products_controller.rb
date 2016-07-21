class Api::V1::ProductsController < ApplicationController
  def index
    @filters = FilterProducts.run(filters: params)
    render json: @filters.result.products
  end
end
