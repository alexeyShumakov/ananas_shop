class CreateFieldsValue < ActiveRecord::Migration
  def change
    create_table :fields_values do |t|
      t.string :title
      t.references :field, index: true, foreign_key: true
    end
  end
end
