import React from 'react';

import Field from './Field';

export default class Fields extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { filter, updateFilter } = this.props;
    let fields = filter.get('fields').map((field, key) =>{
      return <Field {...{key, field, updateFilter, filter}}/>
    });
    return(
      <div>
        <hr/>
        <p>field filter</p>
        {fields}
        <hr/>
      </div>
    );
  }
}
