import React, { PropTypes } from 'react';
import _ from 'lodash';

import List from './status/List';

export default class Status extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {menu: false};
    _.bindAll(this, 'toggleMenu');
  }


  toggleMenu() {
    let { menu } = this.state;
    if(!menu) {
      this.props.fetch();
    }
    this.setState({menu: !menu});
  }

  render() {
    let statusTag, list;
    let { status, statuses, order, fetchOrder, updateOrder } = this.props;
    if(this.state.menu) {
      list = <List
        order={order}
        fetchOrder={fetchOrder}
        updateOrder={updateOrder}
        statuses={statuses}
        toggleMenu={this.toggleMenu}/>
    }
    if (status){
      let title = status.get('title');
      let color = status.get('color');
      let style = {
        color: color
      }
      statusTag = <b style={style}>{title}</b>
    } else {
      statusTag = <b>без статуса</b>
    }
    return (
      <div className='orders-status'>
        {statusTag}
        <span onClick={this.toggleMenu} className="glyphicon glyphicon-cog control-icon"/>
        {list}
      </div>
    );
  }
}
