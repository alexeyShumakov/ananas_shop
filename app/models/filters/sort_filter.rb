class SortFilter < BaseFilter
  def sort?
    params[:sort].present?
  end

  def sort
    sort? ? params[:sort] : 'updated_at desc'
  end

  def orders
    [{ name: 'updated_at desc', title: 'обновлению' },
     { name: 'price', title: 'цене' }]
  end

  def set_products
    @products = @filter.products.order sort
  end

  def set_filters
    @filters = @filter.filters << {
      type: 'SortFilter',
      name: 'sort',
      params: sort? ? [sort] : [],
      sort: sort,
      orders: orders
    }
  end
end
