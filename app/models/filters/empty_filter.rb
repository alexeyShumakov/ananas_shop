class EmptyFilter
  attr_accessor :products, :filters, :params
  def initialize(params)
    @products = Product.none
    @filters = []
    @params = params
  end
end
