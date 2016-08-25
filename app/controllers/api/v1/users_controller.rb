class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!

  def my_profile
    render json: current_user, root: :profile, include: ['orders.line_items.product', 'addresses', 'orders.orders_status']
  end

  def update_profile
    current_user.update user_params
    render json: current_user, root: :profile
  end

  def update
  end

  private

  def user_params
    params.required(:user).permit(:name, :phone)
  end
end
