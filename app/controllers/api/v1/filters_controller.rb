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

    page = params[:page]
    page = page.to_i if page.present?
    @products = @products.page(page)
    filters <<
    {
      type: 'PageFilter',
      name: 'page',
      params: page.present? ? [page] : [],
      page: page || 1,
      totalPages: @products.total_pages,
      totalCount: @products.total_count
    }


    render json: { filters: filters }
  end
end
