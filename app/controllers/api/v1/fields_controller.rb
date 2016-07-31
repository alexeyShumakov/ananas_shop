class Api::V1::FieldsController < ApplicationController
  def index
    render json: Field.all
  end
end
