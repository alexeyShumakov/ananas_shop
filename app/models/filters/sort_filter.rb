class SortFilter < BaseFilter
  def sort?
    params[:sort].present?
  end

  def sort
    sort? ? params[:sort] : 'updated_at desc'
  end

  def orders
    [
      {
        title: 'цене ',
        values: [
          { title: 'цене↑', name: 'price asc' },
          { title: 'цене↓', name: 'price desc' }
        ]
      },
      {
        title: 'обновлению',
        values: [
          { title: 'обновлению', name: 'updated_at desc' }
        ]
      }
    ]
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
