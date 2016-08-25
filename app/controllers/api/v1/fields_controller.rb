class Api::V1::FieldsController < Api::V1::BaseController
  def index
    authorize Field
    @fields = Field.all
    render json: @fields
  end

  def create
    authorize Field
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
