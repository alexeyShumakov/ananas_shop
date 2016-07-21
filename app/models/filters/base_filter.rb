class BaseFilter
  attr_accessor :products, :filters, :filter, :params
  def initialize(filter)
    @filter = filter
    set_filters
  end

  def params
    @filter.params
  end

  def products
    @filter.products
  end

  def filters
    @filter.filters
  end

  def set_filters
  end
end
