class Api::V1::AddressesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_address, only: [:update, :destroy]

  def create
    @address = Address.new address_params
    @address.user = current_user
    if @address.save
      current_user.reset_addresses(@address.id)
      render json: @address
    else
      render json: @address.errors, status: :unprocessable_entity
    end

  end

  def update
    if @address.update address_params
      current_user.reset_addresses(@address.id) if @address.current?
      render json: @address
    else
      render json: @address.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @address.update current: false, deleted: true
    render json: @address
  end

  private

  def set_address
    @address = Address.find(params[:id])
  end

  def address_params
    params.require(:address).permit(:city, :address, :current)
  end
end
