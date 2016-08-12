class FieldFilter < BaseFilter
  def fields
    fields? ? params[:fields].split(';') : []
  end

  def fields?
    params[:fields].present?
  end

  def set_products
    if fields?
      @products = @filter.products.joins( products_fields: :fields_values).where(fields_values: { id: fields }).uniq
    else
      @products = @filter.products
    end
  end

  def set_filters
    f_fields = Field.joins(:products_fields).where(products_fields: {product: @filter.products}).group('fields.id').uniq
    f = f_fields.map do |f|
      values = f.fields_values.joins(:products_fields).where(products_fields: {product: @filter.products}).group('fields_values.id').order(:title).uniq
      values = values.map do |v|
        count = v.products_fields.where(product: @filter.products).size
        selected = fields.include? v.id.to_s
        { id: v.id, title: v.title, selected: selected, count: count }
      end
      {title: f.title, id: f.id, values: values}
    end
    @filters = @filter.filters <<
      { type: 'FieldFilter',
        name: 'fields',
        params: fields,
        fields: f
      }
  end
end
