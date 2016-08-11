class EmptyFilter
  attr_accessor :products, :filters, :params
  def initialize(params)
    @products = Product.where(public: true)
    @filters = []
    @params = params
  end
end
