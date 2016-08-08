class MyCabinet::CabinetController < ApplicationController
  before_action :authenticate_user!

  def my_cabinet
  end

  def orders
    @orders = current_user.orders
  end
end
