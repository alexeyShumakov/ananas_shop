class Api::V1::CartsController < ApplicationController
  ## @cart from application controller
  # get cart only by cookies value
  def show
    render json: @cart, include: ['**']
  end
end
