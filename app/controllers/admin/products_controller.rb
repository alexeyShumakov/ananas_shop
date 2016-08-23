class Admin::ProductsController < Admin::BaseController
  def index
    @products = Product.order('id desc').page(params[:page])
  end

  def show
    @product = Product.find(params[:id])
  end
end
