# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/user_mailer/new_order
  def new_order
    order = Order.create name: 'name', email: 'email', phone: '2123'
    product_1 = Product.create
    product_2 = Product.create
    LineItem.create order: order, fixed_price: 15, count: 3, product: product_1
    LineItem.create order: order, fixed_price: 12, count: 4, product: product_2
    UserMailer.new_order order
  end

end
