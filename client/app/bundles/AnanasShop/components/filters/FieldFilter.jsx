import React from 'react';

import Fields from './fieldsFilter/Fields';

export default class FieldFilter extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { filter, updateFilter } = this.props;
    return( <div> <Fields {...{updateFilter, filter}}/> </div>);
  }
}
