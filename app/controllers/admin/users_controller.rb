class Admin::UsersController < Admin::BaseController
  before_action :set_user, only: [:show]
  def index
    @users = User.all.page(params[:page])
  end

  def show
  end

  private
  
  def set_user
    @user = User.find(params[:id])
  end
end
