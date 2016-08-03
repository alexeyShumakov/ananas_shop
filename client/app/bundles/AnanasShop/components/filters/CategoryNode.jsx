import React, { PropTypes } from 'react';

export default class CategoryNode extends React.Component {
  render() {
    let category = this.props.category;
    let linkClassName = 'sidebar__category';
    let prefix;
    if (category.get('selected')) {
      prefix = <span className="glyphicon glyphicon-menu-right"></span>
      linkClassName = 'sidebar__category-selected';
    } else if(category.get('parent')) {
      linkClassName = 'sidebar__category-parent';
    };

    let children = category.get('children').map((category, key) => {
      return <CategoryNode {...{category, key}}/>;
    })
    return(
          <ul className='sidebar__list list-unstyled'>
            <li> {prefix}
              <a href={`/categories/${category.get('id')}`} className={`${linkClassName}`}>
                {category.get('title')}
              </a>
            </li>
            {children}
          </ul>
      );
  }
}
