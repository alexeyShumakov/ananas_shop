class SearchFilter < BaseFilter
  def set_products
    if params[:keyword].present?
      @products = Product.search_by_title(params[:keyword]).where(public: true).limit(10)
    else
      @products = @filter.products
    end
  end

  def set_filters
    @filters = []
  end
end
