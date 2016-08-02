class FieldFilter < BaseFilter
  def products
    if fields?
      @filter.products.joins( products_fields: :fields_values).where(fields_values: { id: fields }).uniq
    else
      @filter.products
    end
  end

  def fields
    fields? ? params[:fields].split(';') : []
  end

  def fields?
    params[:fields].present?
  end

  def set_filters
    f_fields = Field.joins(:products_fields).where(products_fields: {product: @filter.products}).group('fields.id').uniq
    f = f_fields.map do |f|
      values = f.fields_values.joins(:products_fields).where(products_fields: {product: @filter.products}).group('fields_values.id').order(:title).uniq
      values = values.map do |v|
        selected = fields.include? v.id.to_s
        { id: v.id, title: v.title, selected: selected }
      end
      {title: f.title, id: f.id, values: values}
    end
    @filter.filters <<
      { type: 'FieldFilter',
        name: 'fields',
        params: fields,
        fields: f
      }
  end
end
