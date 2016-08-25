class Api::V1::FieldsValuesController < Api::V1::BaseController
  def create
    authorize FieldsValue
    @fields_value = FieldsValue.new fields_values_params
    if @fields_value.save
      render json: Product.find(params[:product_id]), root: 'product', include: ['**']
    else
      render json: @fields_value.errors, status: :unprocessable_entity
    end
  end

  def fields_values_params
    params.require(:fields_value).permit(:title, :field_id)
  end
end
