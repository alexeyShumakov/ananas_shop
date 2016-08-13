class AddCurrentToAddresses < ActiveRecord::Migration
  def change
    add_column :addresses, :current, :boolean, default: true
  end
end
