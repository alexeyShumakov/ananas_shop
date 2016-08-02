import React from 'react';
import _ from 'lodash';

export default class FieldsList extends React.Component {
  static propTypes = {
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { fields } = this.props;
    let list;
    if(fields && !fields.isEmpty()) {
      fields = fields.map( (f, key) => {
        let values = f.get('fields_values').map( (fv, key) => {
          return fv.get('title');
        }).join(', ');
        return(
          <div {...{key}}>
            <dt>{f.getIn(['field', 'title'])}</dt>
            <dd>{values}</dd>
          </div>
        )
      });
      list =
        <div>
          <hr/>
          <h4>Свойства</h4>
          <dl className="dl-horizontal">
            {fields}
          </dl>
        </div>
    }
    return(<div>{list}</div>);
  }
}
