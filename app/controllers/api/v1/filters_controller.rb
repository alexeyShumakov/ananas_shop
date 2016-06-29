class Api::V1::FiltersController < ApplicationController
  def index
    @products = Product.all
    filters = {
      filters: {
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
      filters[:filters][:price][:min] = @products.minimum(:price).to_i
      filters[:filters][:price][:max] = @products.maximum(:price).to_i
      filters[:filters][:price][:minB] = @products.minimum(:price)
      filters[:filters][:price][:maxB] = @products.maximum(:price)
    end


    if params[:price].present?
      price = params[:price].split(';')
      filters[:filters][:price][:minB] = price[0]
      filters[:filters][:price][:maxB] = price[1]
    end

    render json: filters
  end
end
