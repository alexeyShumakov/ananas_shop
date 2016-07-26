class AddIsHoverToPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :is_hover, :boolean, default: false
  end
end
