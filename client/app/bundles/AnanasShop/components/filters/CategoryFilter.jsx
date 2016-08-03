import React, { PropTypes } from 'react';

import CategoryNode from './CategoryNode';

export default class CategoryFilter extends React.Component {
  render() {
    let categories = this.props.filter.get('categories');
    categories = categories.map((category, key) => {
      return <CategoryNode {...{category, key}}/>
    })
    return(
      <div>
        <h4>Категории</h4>
        {categories}
        <hr/>
      </div>);
  }
}
