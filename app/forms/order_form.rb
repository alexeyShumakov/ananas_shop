class OrderForm < Reform::Form
  property :user_id
  property :name
  property :email
  property :phone
  property :delivery_price
  validates :name, :email, :phone, presence: true
  validates :delivery_price, numericality: {allow_nil: true}

  property :address do
    property :user_id
    property :city
    property :address
    validates :city, :address, presence: true
  end
end
