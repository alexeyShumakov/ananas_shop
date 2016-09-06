import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import Row from './Row';

export default class DropDownMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let container;
    let {categories} = this.props;
    let rows = categories.map((category, key)=> {
      return <Row key={key} category={category}/>
    });
    if (!categories.isEmpty()) {
      container = <div className='categories-menu__drop-down-container'>
          {rows}
        </div>
    }
    return (
      <div> {container} </div>
    );
  }
}
