class Api::V1::BannerItemsController < Api::V1::BaseController
  before_action :authenticate_user!, only: [:create, :destroy]
  def index
    render json: BannerItem.all
  end

  def create
    authorize BannerItem
    @banner_item = BannerItem.new banner_item_params
    if @banner_item.save
      render json: BannerItem.all
    else
      render json: @banner_item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize BannerItem
    @banner_item = BannerItem.find(params[:id]).destroy
    render json: BannerItem.all
  end

  private

  def banner_item_params
    params.require(:banner_item).permit(:image)
  end
end
