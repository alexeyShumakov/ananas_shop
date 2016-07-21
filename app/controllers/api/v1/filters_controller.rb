class Api::V1::FiltersController < ApplicationController
  def index
    @filters = FilterProducts.run(filters: params)
    render json: { filters: @filters.result.filters }
  end
end
