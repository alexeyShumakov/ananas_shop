class BaseFilter
  attr_accessor :products, :filters, :filter, :params
  def initialize(filter)
    @filter = filter
    set_products
    set_filters
  end

  def params
    @filter.params
  end

  def set_filters
  end

  def set_products
  end
end
