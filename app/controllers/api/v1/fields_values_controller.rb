class Api::V1::FieldsValuesController < ApplicationController
  def create
    @fields_value = FieldsValue.new fields_values_params
    if @fields_value.save
      render json: Product.find(params[:product_id]), root: 'product', include: ['**']
    else
    end
  end

  def fields_values_params
    params.require(:fields_value).permit(:title, :field_id)
  end
end
