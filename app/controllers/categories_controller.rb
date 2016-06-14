class CategoriesController < ApplicationController
  before_action :set_category

  def show
    @products = @category.total_products.page params[:page]
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end
end
