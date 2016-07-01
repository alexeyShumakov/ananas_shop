import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import _ from 'lodash';
import * as cartActionCreators from '../actions/cartActionCreators';

import Filters from '../components/Filters';

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class FiltersContainer extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { setPriceFilter, fetchProducts, fetchFilters } = actions;

    let priceFilter = $$cartStore.getIn(['filters', 'price']);
    let categoryId = this.props.params.categoryId;
    let query = this.props.location.query;
    return (
      <div>
        <Filters {...{
          categoryId,
          priceFilter,
          query,
          fetchProducts,
          fetchFilters,
          setPriceFilter
        }}/>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}

export default connect(select)(FiltersContainer);
