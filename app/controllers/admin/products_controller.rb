class Admin::ProductsController < Admin::BaseController
  def index
  end

  def new
  end

  def show
    @product = Product.find(params[:id])
  end

  def edit
  end
end
