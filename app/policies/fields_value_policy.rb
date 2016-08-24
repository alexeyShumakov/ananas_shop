class FieldsValuePolicy < ApplicationPolicy
  def create?
    user.admin?
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
