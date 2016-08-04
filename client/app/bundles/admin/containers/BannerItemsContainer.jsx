import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as bannerActionCreators from '../actions/bannerActionCreators';
import BannerItems from '../components/BannerItems';

function select(state) {
  return { $$adminStore: state.$$adminStore };
}

class BannerItemsContainer extends React.Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { $$adminStore, dispatch } = this.props;
    const actions = bindActionCreators(bannerActionCreators, dispatch);
    return (
      <BannerItems store={$$adminStore} actions={actions} />
    );
  }
}

export default connect(select)(BannerItemsContainer);
