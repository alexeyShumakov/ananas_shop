class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.references :user, index: true, foreign_key: true
      t.string :city
      t.string :address

      t.timestamps null: false
    end
  end
end
