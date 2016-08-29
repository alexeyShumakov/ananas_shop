class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :update]

  def show
    render json: @user
  end
  def my_profile
    render json: current_user, root: :profile, include: ['orders.line_items.product', 'addresses', 'orders.orders_status']
  end

  def update_profile
    current_user.update user_params
    render json: current_user, root: :profile
  end

  def update
    authorize User
    @user.update admin_user_params
    render json: @user
  end

  def roles
    render json: User.roles
  end

  private

  def set_user
    @user = User.find params[:id]
  end

  def user_params
    params.required(:user).permit(:name, :phone)
  end

  def admin_user_params
    params.required(:user).permit(:name, :phone, :role)
  end
end
