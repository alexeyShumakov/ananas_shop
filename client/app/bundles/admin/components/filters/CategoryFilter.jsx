import React, { PropTypes } from 'react';

import CategoryNode from './CategoryNode';

export default class CategoryFilter extends React.Component {
  render() {
    let { filter, updateFilter } = this.props;
    let categories = filter.get('categories');
    categories = categories.map((category, key) => {
      return <CategoryNode {...{filter, category, updateFilter, key}}/>
    })
    return(
      <div>
        <h4>Категории</h4>
        {categories}
      </div>);
  }
}
