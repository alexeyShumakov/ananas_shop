class CreateProductsFieldsValues < ActiveRecord::Migration
  def change
    create_table :products_fields_values do |t|
      t.references :products_field, index: true, foreign_key: true
      t.references :fields_value, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
