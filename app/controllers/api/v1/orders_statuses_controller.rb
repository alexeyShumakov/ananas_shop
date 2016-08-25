class Api::V1::OrdersStatusesController < Api::V1::BaseController
  before_action :set_os, only: [:update, :destroy]
  def index
    authorize OrdersStatus
    render json: OrdersStatus.all
  end

  def create
    authorize OrdersStatus
    @os = OrdersStatus.new os_params
    if @os.save
      render json: @os
    else
      render json: @os.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize OrdersStatus
    if @os.update os_params
      render json: @os
    else
      render json: @os.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize OrdersStatus
    @os.destroy
    render json: nil
  end

  private

  def set_os
    @os = OrdersStatus.find params[:id]
  end
  def os_params
    params.require(:orders_status).permit(:color, :title)
  end

end
