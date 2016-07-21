class PriceFilter < BaseFilter
  def price
    price = params[:price]
    return [min, max] unless price.present?
    price.split(';')
  end

  def min_b
    price[0].to_i
  end

  def max_b
    price[1].to_i
  end

  def min
    minimum = @filter.products.minimum(:price)
    return 0 unless minimum
    minimum.to_i
  end

  def max
    maximum = @filter.products.maximum(:price)
    return 100 unless maximum
    maximum.ceil
  end

  def products
    @filter.products.where 'price >= ? AND price <= ?', min_b, max_b
  end

  def set_filters
    @filter.filters <<
      { type: 'PriceFilter',
        name: 'price',
        params: [min_b, max_b],
        min:  min,
        max:  max,
        minB: min_b,
        maxB: max_b,
        minFormB: min_b,
        maxFormB: max_b }
  end
end
