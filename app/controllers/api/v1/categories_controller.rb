class Api::V1::CategoriesController < Api::V1::BaseController
  def index
    render json: Category.all
  end

  def show
    render json: Category.find(params[:id]), serializer: FullCategorySerializer
  end
end
