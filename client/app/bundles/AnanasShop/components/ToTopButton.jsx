import React, { PropTypes } from 'react';
import Waypoint from 'react-waypoint';
import _ from 'lodash';


export default class ToTopButton extends React.Component {
  static contextTypes = {
  }

  constructor(props, context) {
    super(props, context);
    this.state = {show: false};
    _.bindAll(this, 'toTop', 'showButton', 'hideButton');
  }

  showButton(e) {
    if (e.currentPosition == 'above') {
      this.setState({ show: true});
    }
  }

  hideButton(e) {
    if (e.currentPosition == 'below' || e.currentPosition == 'inside') {
      this.setState({ show: false});
    }
  }

  toTop() {
    window.scrollTo(0,0);
  }

  render() {
    let { show } = this.state;
    let button;
    if (show) {
      button =
        <div className="to-top-button btn btn-primary text-center" onClick={this.toTop}><span className="glyphicon glyphicon-chevron-up"/></div>
    }
    return (
      <div>
        <Waypoint onLeave={this.showButton} onEnter={this.hideButton}/>
        {button}
      </div>
    );
  }
}
