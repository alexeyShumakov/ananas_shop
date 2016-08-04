class CreateBannerItems < ActiveRecord::Migration
  def change
    create_table :banner_items do |t|

      t.timestamps null: false
    end
  end
end
