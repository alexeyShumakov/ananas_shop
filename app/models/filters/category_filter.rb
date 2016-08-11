class CategoryFilter < BaseFilter
  def category_id
    category_id = params[:category]
    category_id.present? ? category_id.to_i : nil
  end

  def set_products
    if category_id.present?
      @products = Category.find(category_id).total_products.where public: true
    else
      @products = @filter.products
    end
  end

  def set_filters
    categories = get_tree(Category.roots)
    if category_id.present?
      @filters = @filter.filters << {
        type: 'CategoryFilter',
        name: 'category',
        params: [category_id],
        id: category_id,
        categories: categories
      }
    else
      @filters = @filter.filters
    end
  end

  def get_tree(categories)
    categories.map do |category|
      selected = false
      parent = false
      children = []
      if category.id == category_id
        selected = true
        children = get_tree category.children
      elsif category.descendants.exists?(category_id)
        parent = true
        children = get_tree category.children
      end
      { id: category.id,
        title: category.title,
        parent: parent,
        selected: selected,
        children: children }
    end
  end
end
