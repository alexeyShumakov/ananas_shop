class AddPublicAndExampleToProducts < ActiveRecord::Migration
  def change
    add_column :products, :public, :boolean, default: false
    add_column :products, :example, :boolean, default: false
  end
end
