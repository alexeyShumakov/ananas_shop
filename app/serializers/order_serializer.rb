class OrderSerializer < ActiveModel::Serializer
  attributes :id, :fixed_total_price, :status, :created_at
  has_many :line_items

  def created_at
    object.created_at.strftime('%d.%m.%Y %H:%M')
  end
end
