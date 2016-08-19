class OrderSerializer < ActiveModel::Serializer
  attributes :id, :fixed_total_price, :status, :created_at, :email, :phone, :name, :delivery_price
  has_many :line_items
  belongs_to :address

  def created_at
    object.created_at.strftime('%d.%m.%Y %H:%M')
  end
end
