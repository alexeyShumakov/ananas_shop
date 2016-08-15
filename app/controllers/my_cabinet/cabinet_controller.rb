class MyCabinet::CabinetController < ApplicationController
  before_action :authenticate_user!

  def my_cabinet
  end

  def orders
  end

  def addresses
  end
end
