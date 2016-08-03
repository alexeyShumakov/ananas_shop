class EmptyFilter
  attr_accessor :products, :filters, :params
  def initialize(params)
    @products = []
    @filters = []
    @params = params
  end
end
