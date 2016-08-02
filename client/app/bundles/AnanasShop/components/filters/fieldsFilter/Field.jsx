import React from 'react';

import Value from './Value';

export default class Field extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { field, filter, updateFilter } = this.props;
    let title = field.get('title');
    let values = field.get('values').map((value, key) =>{
      return <Value {...{key, value, filter, updateFilter}}/>
    });
    return(
      <div>
        <b>{title}</b>
        {values}
      </div>
    );
  }
}
