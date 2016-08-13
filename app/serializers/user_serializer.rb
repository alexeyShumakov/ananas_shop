class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone
  has_many :orders
  has_many :addresses

  def addresses
    object.addresses.where(deleted: false).order(:city)
  end
  def orders
    object.orders.order('created_at desc')
  end
end
