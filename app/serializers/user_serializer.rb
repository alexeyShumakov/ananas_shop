class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone
  has_many :orders

  def orders
    object.orders.order('created_at desc')
  end
end
