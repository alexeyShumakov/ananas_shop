class Admin::CategoriesController < Admin::BaseController
  before_action :set_category, only: [:show, :edit, :destroy, :update]
  before_action :set_categories, only: [:edit, :create, :update, :new]

  def index
    @categories = Category.all
  end

  def show
  end

  def edit
  end

  def update
    if @category.update category_params
      redirect_to admin_category_path(@category), notice: 'Отлично, категория создана'
    else
      render :edit
    end
  end

  def create
    @category = Category.new category_params
    if @category.save
      redirect_to admin_category_path(@category), notice: 'Отлично, категория создана'
    else
      render :edit
    end
  end

  def new
    @category = Category.new
  end

  def destroy
    message = 'Category is gone...'
    @category.destroy  rescue message = 'Невозможно удалить категорию'
    redirect_to admin_categories_path, notice: message
  end
  private

  def set_categories
    @categories = Category.all.map {|c| [c.tree_name, c.id]}
  end

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:title, :parent_id)
  end
end
