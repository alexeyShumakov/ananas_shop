class CategoryFilter < BaseFilter
  def category_id
    category_id = params[:category]
    category_id.present? ? category_id.to_i : nil
  end

  def set_products
    if category_id.present?
      @products = Category.find(category_id).total_products
    else
      @products = @filter.products
    end
  end

  def set_filters
    if category_id.present?
      @filters = @filter.filters << {
        type: 'CategoryFilter',
        name: 'category',
        params: [category_id],
        id: category_id
      }
    else
      @filters = @filter.filters
    end
  end
end
