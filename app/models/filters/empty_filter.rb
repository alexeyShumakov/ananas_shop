class EmptyFilter
  attr_accessor :products, :filters, :params
  def initialize(params)
    @products = Product.all
    @filters = []
    @params = params
  end
end
