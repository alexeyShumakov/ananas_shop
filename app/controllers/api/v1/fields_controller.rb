class Api::V1::FieldsController < ApplicationController
  def index
    render json: Field.all
  end

  def create
    @field = Field.new fields_params
    if @field.save
      render json: @field
    else
      render json @field.errors, status: :unprocessable_entity
    end
  end

  private

  def fields_params
    params.require(:field).permit(:title)
  end
end
