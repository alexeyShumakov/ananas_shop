class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.references :user, index: true, foreign_key: true
      t.references :address, index: true, foreign_key: true
      t.decimal :total_price, precision: 8, scale: 2
      t.integer :status, default: 0
      t.string :name
      t.string :email
      t.string :phone

      t.timestamps null: false
    end
  end
end
