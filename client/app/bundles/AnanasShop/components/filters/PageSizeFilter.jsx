import React from 'react';
import _ from 'lodash';

import Size from './PageSizeItem';

export default class PageSizeFilter extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickHandler');
  }

  clickHandler() {
  }

  render() {
    let { filter, updateFilter } = this.props;
    let sizes = [24, 50, 100].map((size, key) => {
      return <Size {...{size, key, filter, updateFilter } }/>
    })
    return(
      <div className='page-size'>
        <hr/>
        <ul className='list-inline'>Показывать по: {sizes}</ul>
      </div>
    );
  }
}
