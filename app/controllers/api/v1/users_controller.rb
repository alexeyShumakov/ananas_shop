class Api::V1::UsersController < ApplicationController
  def my_profile
    if user_signed_in?
      render json: current_user, root: :profile, include: ['orders.line_items.product', 'addresses', 'orders.orders_status']
    else
      render json: nil, status: 401
    end
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
