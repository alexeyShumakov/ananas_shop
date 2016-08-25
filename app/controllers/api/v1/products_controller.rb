class Api::V1::ProductsController < Api::V1::BaseController
  before_action :authenticate_user!, only: [:update, :create]
  def index
    @filters = FilterProducts.run(filters: params)
    @products = @filters.result.products.includes(:pictures)
    render json: @products, each_serializer: ShortProductSerializer
  end

  def show
    @product = Product.find(params[:id])
    render json: @product, include: ['**']
  end

  def update
    authorize Product
    @product = Product.find(params[:id])
    if @product.update product_params
      render json: @product, include: ['**']
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def create
    authorize Product
    @product = Product.new(product_params);
    if @product.save
      render json: @product, include: ['**']

    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  private

  def product_params
    params.require(:product).permit(:category_id, :title, :price, :description, :public, :example)
  end
end
