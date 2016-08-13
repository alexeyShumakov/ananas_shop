class AddDeletedToAddresses < ActiveRecord::Migration
  def change
    add_column :addresses, :deleted, :boolean, default: false
  end
end
