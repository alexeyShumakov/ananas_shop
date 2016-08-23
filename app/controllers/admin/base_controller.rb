class Admin::BaseController < ApplicationController
  layout 'admin'
  before_action :admin_auth

  private

  def admin_auth
    authenticate_user!
    redirect_to root_path unless current_user.admin?
  end
end
