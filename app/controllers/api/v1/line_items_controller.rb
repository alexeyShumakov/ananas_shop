class Api::V1::LineItemsController < ApplicationController
  before_action :set_product, only: [:create]

  def create
    exec = CreateLineItem.run(product: @product, cart: @cart, count: params[:count] || 1 )
    @line_item = exec.result
    @cart.reload
    render json: @cart, root: 'cart', include: ['**']
  end

  def destroy
    @line_item = LineItem.find params[:id]
    @line_item.destroy

    @cart.reload
    render json: @cart, root: 'cart', include: ['**']
  end

  def update
    @line_item = LineItem.find params[:id]
    @line_item.update(count: params[:count])
    @cart.reload
    render json: @cart, root: 'cart', include: ['**']
  end

  private

  def set_product
    @product = Product.find params[:product_id]
  end
end
