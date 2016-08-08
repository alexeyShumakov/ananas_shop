class Api::V1::UsersController < ApplicationController
  def my_profile
    render json: current_user
  end
end
