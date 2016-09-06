class Api::V1::CategoriesController < Api::V1::BaseController
  def index
    if params[:roots]
      render json: Category.roots, include: '*.*.*'
    else
      render json: Category.all
    end
  end

  def show
    render json: Category.find(params[:id]), serializer: FullCategorySerializer
  end
end
