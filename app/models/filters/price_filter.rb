class PriceFilter < BaseFilter
  def price
    price = params[:price]
    return [min, max] unless price.present?
    price.split(';')
  end

  def fields
    params[:fields].present? ? params[:fields].split(';') : []
  end

  def fields_products
    if params[:fields].present?
      @filter.products.joins( products_fields: :fields_values).where(fields_values: { id: fields }).uniq
    else
      @filter.products
    end
  end

  def min_b
    price[0].to_i
  end

  def max_b
    price[1].to_i
  end


  def min
    minimum = fields_products.minimum(:price)
    return 0 unless minimum
    minimum.to_i
  end

  def max
    maximum = fields_products.maximum(:price)
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
