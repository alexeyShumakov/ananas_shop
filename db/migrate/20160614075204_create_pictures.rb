class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.references :product

      t.timestamps null: false
    end
  end
end
