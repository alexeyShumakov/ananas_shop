require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "new_order" do
    let!(:order) { create :order }
    let!(:line_item_1) { create :line_item, order: order, fixed_price: 4, count: 2 }
    let!(:line_item_2) { create :line_item, order: order, fixed_price: 4, count: 2 }
    let!(:mail) { UserMailer.new_order(order) }

    it "renders the headers" do
      expect(mail.to).to eq([order.email])
      expect(mail.from).to eq(["from@example.com"])
    end
  end

end
