class Api::V1::PicturesController < ApplicationController
  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      render json: Product.find(product_id), root: 'product'
    end
  end

  def update
    @picture = Picture.find(params[:id])
    product = @picture.product
    product.pictures.each do |pic|
      pic.is_hover = false
      pic.save
    end
    if @picture.update picture_params
      render json: Product.find(product_id), root: 'product'
    end

  end

  def destroy
    @picture = Picture.find(params[:id])
    if @picture.delete
      render json: Product.find(product_id), root: 'product'
    end
  end

  private

  def picture_params
    params.require(:picture).permit(:product_id, :image, :is_hover)
  end

  def product_id
    @picture.product.id
  end
end
