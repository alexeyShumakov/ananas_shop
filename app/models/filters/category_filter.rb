class CategoryFilter < BaseFilter
  def category_id
    category_id = params[:category]
    category_id.present? ? category_id.to_i : nil
  end

  def products
    if category_id.present?
      Category.find(category_id).total_products
    else
      @filter.products
    end
  end

  def set_filters
    if category_id.present?
      @filter.filters << {
        type: 'CategoryFilter',
        name: 'category',
        params: [category_id],
        id: category_id
      }
    end
  end
end
