class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.references :cart, index: true, foreign_key: true
      t.references :product, index: true, foreign_key: true
      t.decimal :fixed_price, precision: 8, scale: 2
      t.integer :count

      t.timestamps null: false
    end
  end
end
