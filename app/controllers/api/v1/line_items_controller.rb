class Api::V1::LineItemsController < ApplicationController
  before_action :set_product, only: [:create]

  def create
    exec = CreateLineItem.run(product: @product, cart: @cart, count: params[:count] || 1 )
    @cart.reload
    render json: @cart, root: 'cart'
  end

  def destroy
    @line_item = LineItem.find params[:id]
    @line_item.destroy

    @cart.reload
    render json: @cart, root: 'cart'
  end

  private

  def set_product
    @product = Product.find params[:product_id]
  end
end
