class Api::V1::ProductsFieldsController < ApplicationController
  def create
    @products_field = ProductsField.new products_fields_params
    if @products_field.save
      render json: @products_field.product, root: 'product', include: ['**']
    else
      render json: @products_field.errors, status: :unprocessable_entity
    end
  end

  def update
    @products_field = ProductsField.find params[:id]
    @products_field.fields_values = FieldsValue.find products_fields_params[:fields_values].split(';')
    if @products_field.save
      render json: @products_field.product, root: 'product', include: ['**']
    else
      render json: @products_field.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @products_field = ProductsField.find params[:id]
    if @products_field.destroy
      render json: @products_field.product, root: 'product', include: ['**']
    else
      render json: @products_field.errors, status: :unprocessable_entity
    end

  end

  private

  def products_fields_params
    params.require(:products_field).permit(:product_id, :field_id, :fields_values)
  end
end
