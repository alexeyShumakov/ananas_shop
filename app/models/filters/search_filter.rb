class SearchFilter < BaseFilter
  def products
    if params[:keyword].present?
      Product.search_by_title(params[:keyword]).limit(10)
    else
      @filter.products
    end
  end
end
