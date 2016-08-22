import React from 'react';

import Field from './Field';

export default class Fields extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { filter, updateFilter } = this.props;
    let fields;
    if (!filter.get('fields').isEmpty()) {
      fields = filter.get('fields').map((field, key) =>{
        return <Field {...{key, field, updateFilter, filter}}/>
      });
      fields =
        <div>
          <h4>Свойства</h4>
          <div className='fields-filter'>
            {fields}
          </div>
        </div>
    }
    return(
      <div> {fields} </div>
    );
  }
}
