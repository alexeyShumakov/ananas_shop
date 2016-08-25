class LineItemPolicy < ApplicationPolicy
  attr_reader :user, :record

  def destroy?
    user.admin? || record.order.empty?
  end

  def update?
    user.admin? || record.order.empty?
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
