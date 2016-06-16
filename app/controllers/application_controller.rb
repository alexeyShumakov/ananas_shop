class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :set_cart, :set_cart_json

  private

  def set_cart
    @cart = Cart.find(cookies[:cart_id])
  rescue ActiveRecord::RecordNotFound
    @cart = Cart.create
    cookies[:cart_id] = { value: @cart.id, expires: Time.now + 1.year }
  end

  def set_cart_json
    @cart_props = CartSerializer.new(@cart).as_json
  end
end
