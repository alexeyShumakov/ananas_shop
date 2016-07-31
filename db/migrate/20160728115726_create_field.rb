class CreateField < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.string :title
      t.string :slug
    end
  end
end
