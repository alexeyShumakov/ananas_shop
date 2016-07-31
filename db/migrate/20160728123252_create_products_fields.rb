class CreateProductsFields < ActiveRecord::Migration
  def change
    create_table :products_fields do |t|
      t.references :product, index: true, foreign_key: true
      t.references :field, index: true, foreign_key: true
    end
  end
end
