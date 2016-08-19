class Api::V1::LineItemsController < ApplicationController
  before_action :set_product, only: [:create]
  before_action :set_line_item, only: [:destroy, :update]

  def create
    exec = CreateLineItem.run(product: @product, cart: @cart, count: params[:count] || 1 )
    @line_item = exec.result
    @cart.reload
    render json: @cart, root: 'cart', include: ['line_items.product']
  end

  def destroy
    @line_item.destroy

    @cart.reload
    render json: @cart, root: 'cart', include: ['line_items.product']
  end

  def update
    @line_item.update(count: params[:count])
    @cart.reload
    render json: @cart, root: 'cart', include: ['line_items.product', 'line_items']
  end

  private

  def set_line_item
    @line_item = LineItem.find params[:id]
  end

  def set_product
    @product = Product.find params[:product_id]
  end
end
