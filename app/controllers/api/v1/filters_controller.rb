class Api::V1::FiltersController < ApplicationController
  def index
    @products = Product.all
    filters = {
      filters: {
        categoryId: nil,
        price: {
          min:  @products.minimum(:price),
          max:  @products.maximum(:price),
          minB: @products.minimum(:price),
          maxB: @products.maximum(:price)
        }
      }
    }

    if params[:category_id].present?
      category = Category.find params[:category_id]
      @products = category.total_products
      filters[:filters][:categoryId] = category.id
      filters[:filters][:price][:min] = @products.minimum(:price).to_i
      filters[:filters][:price][:max] = @products.maximum(:price).to_i
      filters[:filters][:price][:minB] = @products.minimum(:price).to_i
      filters[:filters][:price][:maxB] = @products.maximum(:price).to_i
    end


    if params[:price].present?
      price = params[:price].split(';')
      filters[:filters][:price][:minB] = price[0].to_i
      filters[:filters][:price][:maxB] = price[1].to_i
    end

    render json: filters
  end
end
