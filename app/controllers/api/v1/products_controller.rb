class Api::V1::ProductsController < ApplicationController
  def index
    @filters = FilterProducts.run(filters: params)
    render json: @filters.result.products.includes(:pictures), each_serializer: ShortProductSerializer
  end

  def show
    @product = Product.find(params[:id])
    render json: @product, include: ['**']
  end

  def update
    @product = Product.find(params[:id])
    if @product.update product_params
      render json: @product, include: ['**']
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def create
    @product = Product.new(product_params);
    if @product.save
      render json: @product, include: ['**']

    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  private

  def product_params
    params.require(:product).permit(:category_id, :title, :price, :description)
  end
end
