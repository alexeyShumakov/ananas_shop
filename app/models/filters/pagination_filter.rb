class PaginationFilter < BaseFilter
  def page
    page = params[:page]
    page.to_i if page.present?
  end

  def per_page
    per = params[:per]
    per.to_i if per.present?
  end

  def set_products
    @products = @filter.products.page(page).per(per_page)
  end

  def set_filters
    @filters = @filter.filters <<
      {
        type: 'PageFilter',
        name: 'page',
        params: page.present? ? [page] : [],
        page: page || 1,
        totalPages: products.total_pages,
        totalCount: products.total_count
      }
    @filters <<
      {
        type: 'PageSizeFilter',
        name: 'per',
        params: per_page.present? ? [per_page] : [],
        size: per_page || 24
      }
  end
end
