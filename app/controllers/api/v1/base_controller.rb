module Api
  module V1
    class BaseController < ApplicationController
      private

      def authenticate_user!
        unless current_user
          render json: {error: :authentication_error }, status: 401
        end
      end
    end
  end
end
