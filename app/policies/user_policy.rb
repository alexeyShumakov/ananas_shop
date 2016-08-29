class UserPolicy < ApplicationPolicy
  def update?
    user.admin?
  end
  class Scope < Scope
    def resolve
      scope
    end
  end
end
