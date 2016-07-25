class Api::V1::PicturesController < ApplicationController
  def create
    @picture = Picture.new(picture_params)
    product_id = @picture.product.id

    if @picture.save
      render json: Product.find(product_id), root: 'product'
    end
  end

  def destroy
    @picture = Picture.find(params[:id])
    product_id = @picture.product.id
    if @picture.delete
      render json: Product.find(product_id), root: 'product'
    end
  end

  private

  def picture_params
    params.require(:picture).permit(:product_id, :image)
  end
end
