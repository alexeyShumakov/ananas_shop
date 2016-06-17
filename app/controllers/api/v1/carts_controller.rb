class Api::V1::CartsController < ApplicationController
  def show
    @cart = Cart.find params[:id]
    render json: @cart, include: ['**']
  end
end
