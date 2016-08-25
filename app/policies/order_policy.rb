class OrderPolicy < ApplicationPolicy
  def show?
    user.admin? || user.orders.find_by(id: record.id)
  end

  def update?
    user.admin?
  end
  class Scope < Scope
    def resolve
      scope
    end
  end
end
