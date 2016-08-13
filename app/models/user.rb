class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

  has_many :orders
  has_many :addresses

  def reset_addresses(address_id = nil)
    addresses.where.not(id: address_id).each do |address|
      address.current = false
      address.save
    end
  end

end
