class Api::V1::FiltersController < Api::V1::BaseController
  def index
    @filters = FilterProducts.run(filters: params)
    render json: { filters: @filters.result.filters }
  end
end
