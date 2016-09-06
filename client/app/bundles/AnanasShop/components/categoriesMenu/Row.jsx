import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

export default class Row extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let {category} = this.props;
    let id = category.get('id');
    let title = category.get('title');
    let children = category.get('children');
    children = children.map((item, key)=>{
      id = item.get('id');
      title = item.get('title');

      return <li key={key}>
          <a href={`/category/${id}`}>{title}</a>
        </li>
    })
    return (
      <div className="categories-menu__item">
        <a href={`/category/${id}`}><b>{title}</b></a>
        <ul className='list-unstyled'>
          {children}
        </ul>
      </div>
    );
  }
}
