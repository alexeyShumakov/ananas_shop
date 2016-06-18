class ProductsController < ApplicationController
  before_action :set_product, only: [:show]

  def index
    @products = Product.all.page(params[:page])
  end

  def search
    @keyword = params[:keyword]
    @products = Product.search_by_title(@keyword).page(params[:page])
  end

  def show
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end
end
