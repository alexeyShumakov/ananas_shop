class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery with: :exception

  before_action :set_cart, :set_similar_product_ids

  private

  def set_similar_product_ids
    session[:similar_product_ids] ||= []
  end

  def set_cart
    @cart = Cart.find(cookies[:cart_id])
  rescue ActiveRecord::RecordNotFound
    @cart = Cart.create
    cookies[:cart_id] = { value: @cart.id, expires: Time.now + 1.year }
  end
end
