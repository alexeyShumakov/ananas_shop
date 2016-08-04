class AddAttachmentImageToBannerItems < ActiveRecord::Migration
  def self.up
    change_table :banner_items do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :banner_items, :image
  end
end
