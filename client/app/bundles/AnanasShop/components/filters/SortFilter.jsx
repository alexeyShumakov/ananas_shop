import React from 'react';

import Item from './SortItem';

export default class SortFilter extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {filter, updateFilter} = this.props;
    let items = this.props.filter.get('orders').map((item, key) => {
      return <Item {...{key, filter, updateFilter, item}}/>
    })
    return(
      <div>
        <hr/>
        <ul className='list-inline'> сортировать по: {items} </ul>
        <hr/>
      </div>
    );
  }
}
