import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import DDMenu from './DropDownMenu';

export default class RootLink extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {show: false};
    _.bindAll(this, 'enter', 'leave');
  }

  enter() {
    this.setState({show: true});
  }

  leave() {
    this.setState({show: false});
  }
  render() {
    let ddMenu;
    let i;
    let { category } = this.props;
    let id = category.get('id');
    let title = category.get('title');
    if (this.state.show) {
      ddMenu =<DDMenu categories={category.get('children')}/>
    }
    return (
      <li className='categories-menu__root-link' onMouseEnter={this.enter} onMouseLeave={this.leave}>
        <a href={`/category/${id}`}>{title}</a>
        {ddMenu}
      </li>
    );
  }
}
