class SearchFilter < BaseFilter
  def set_products
    if params[:keyword].present?
      @products = Product.search_by_title(params[:keyword]).where(public: true)
    else
      @products = @filter.products
    end
  end

  def keyword
    params[:keyword]
  end

  def filter_value
    keyword.present? ? keyword : ''
  end

  def filter_params
    keyword.present? ? [keyword] : []
  end
  def set_filters
    @filters = @filter.filters << {
      type: 'KeywordFilter',
      name: 'keyword',
      params: filter_params,
      value: filter_value
    }
  end
end
