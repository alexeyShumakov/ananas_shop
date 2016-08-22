import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

export default class CategoryNode extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'updateFilter');
  }

  updateFilter(e) {
    e.preventDefault();
    let { category, updateFilter, filter } = this.props;
    let params = Immutable.List([category.get('id')]);
    let newFilter = filter.set('params', params);
    updateFilter(newFilter);
  }
  render() {
    let { category, updateFilter, filter } = this.props;
    let linkClassName = 'sidebar__category';
    let prefix;
    if (category.get('selected')) {
      prefix = <span className="glyphicon glyphicon-menu-right"></span>
      linkClassName = 'sidebar__category-selected';
    } else if(category.get('parent')) {
      linkClassName = 'sidebar__category-parent';
    };

    let children = category.get('children').map((category, key) => {
      return <CategoryNode {...{filter, category, key, updateFilter}}/>;
    })
    return(
          <ul className='sidebar__list list-unstyled'>
            <li> {prefix}
              <a href={`/admin/categories/${category.get('id')}`} className={`${linkClassName}`} onClick={this.updateFilter}>
                {category.get('title')}
              </a>
            </li>
            {children}
          </ul>
      );
  }
}
