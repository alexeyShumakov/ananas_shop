class Api::V1::FiltersController < ApplicationController
  def index
    @products = Product.all
    filters = []

    if params[:category].present?
      category = Category.find params[:category]
      @products = category.total_products
      filters <<
      {
        type: 'CategoryFilter',
        name: 'category',
        params: [ category.id ],
        id: category.id
      }
    end

    min = @products.minimum(:price).to_i
    max = @products.maximum(:price).to_i
    if params[:price].present?
      price = params[:price].split(';')
      minB = price[0].to_i
      maxB = price[1].to_i
      @products = @products.where 'price >= ? AND price <= ?', minB, maxB

      filters <<
      {
        type: 'PriceFilter',
        name: 'price',
        params: [ minB, maxB ],
        min:  min,
        max:  max,
        minB: minB,
        maxB: maxB,
        minFormB: minB,
        maxFormB: maxB
      }
    else
      filters <<
      {
        type: 'PriceFilter',
        name: 'price',
        params: [],
        min:  min,
        max:  max,
        minB: min,
        maxB: max,
        minFormB: min,
        maxFormB: max
      }
    end

    sort = params[:sort]
    orders = [{name: 'updated_at desc', title: 'обновлению'},{name: 'price', title: 'цене'}]
    if sort.present?
      @products = @products.order sort
      filters <<
      {
        type: 'SortFilter',
        name: 'sort',
        params: [sort],
        sort: sort,
        orders: orders
      }
    else
      @products = @products.order 'updated_at desc'
      filters <<
      {
        type: 'SortFilter',
        name: 'sort',
        params: [],
        sort: 'updated_at desc',
        orders: orders
      }
    end

    page = params[:page]
    page = page.to_i if page.present?

    per = params[:per]
    per = per.to_i if per.present?
    @products = @products.page(page).per(per)
    filters <<
    {
      type: 'PageFilter',
      name: 'page',
      params: page.present? ? [page] : [],
      page: page || 1,
      totalPages: @products.total_pages,
      totalCount: @products.total_count
    }

    filters <<
    {
      type: 'PageSizeFilter',
      name: 'per',
      params: per.present? ? [per] : [],
      size: per || 24
    }


    render json: { filters: filters }
  end
end
