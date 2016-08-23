class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery with: :exception

  before_action :set_cart

  private

  def set_cart
    @cart = Cart.find(cookies[:cart_id])
  rescue ActiveRecord::RecordNotFound
    @cart = Cart.create
    cookies[:cart_id] = { value: @cart.id, expires: Time.now + 1.year }
  end
end
