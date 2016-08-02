class FilterProducts < Mutations::Command
  optional do
    hash :filters do
      string :*, empty: true
    end
  end

  def execute
    empty_filter = EmptyFilter.new inputs[:filters]
    search_filter = SearchFilter.new empty_filter
    category_filter = CategoryFilter.new search_filter
    price_filter = PriceFilter.new category_filter
    field_filter = FieldFilter.new price_filter
    sort_filter = SortFilter.new field_filter
    pagination_filter = PaginationFilter.new sort_filter
  end
end
