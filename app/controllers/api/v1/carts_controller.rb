class Api::V1::CartsController < Api::V1::BaseController
  ## @cart from application controller
  # get cart only by cookies value
  def show
    render json: @cart, include: ['**']
  end
end
