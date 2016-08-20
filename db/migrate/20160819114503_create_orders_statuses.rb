class CreateOrdersStatuses < ActiveRecord::Migration
  def change
    create_table :orders_statuses do |t|
      t.string :title
      t.string :color

      t.timestamps null: false
    end
  end
end
