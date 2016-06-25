class OrderForm < Reform::Form
  property :user_id
  property :name
  property :email
  property :phone
  validates :name, :email, :phone, presence: true

  property :address do
    property :user_id
    property :city
    property :address
    validates :city, :address, presence: true
  end
end
