class Api::V1::LineItemsController < ApplicationController
  before_action :set_product, only: [:create]

  def create
    exec = CreateLineItem.run(product: @product, cart: @cart, count: params[:count] || 1 )
    @line_item = exec.result
    if @line_item.valid?
      render json: @line_item
    else
      render json: @line_item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @line_item = LineItem.find params[:id]
    @line_item.destroy
    render json: {status: 'deleted'}
  end

  private

  def set_product
    @product = Product.find params[:product_id]
  end
end
