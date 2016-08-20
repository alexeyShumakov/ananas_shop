class AddOrdersStatusToOrders < ActiveRecord::Migration
  def change
    add_reference :orders, :orders_status, index: true, foreign_key: true
  end
end
