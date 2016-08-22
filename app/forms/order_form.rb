class OrderForm < Reform::Form
  property :user_id
  property :name
  property :email
  property :phone
  property :delivery_price
  property :orders_status
  property :address do
    property :user_id
    property :city
    property :address
    validates :city, :address, presence: true
  end

  validates :name, :email, :phone, presence: true
  validates :delivery_price, numericality: {allow_nil: true}
end
