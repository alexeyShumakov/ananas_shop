class Admin::OrdersController < Admin::BaseController
  def index
    @orders = Order.all.order('id desc').page params[:page]
  end

  def show
    @order = Order.find(params[:id])
  end
end
