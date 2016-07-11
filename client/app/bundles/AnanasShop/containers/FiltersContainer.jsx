import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import _ from 'lodash';
import * as filtersActionCreators from '../actions/filtersActionCreators';

import Filters from '../components/Filters';

function select(state) {
  return { $$filtersStore: state.$$filtersStore };
}

class FiltersContainer extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$filtersStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  render() {
    const { dispatch, $$filtersStore } = this.props;
    const actions = bindActionCreators(filtersActionCreators, dispatch);
    let { fetchData, setFilter } = actions;

    let filters = $$filtersStore.get('filters');
    let params = this.props.params;
    let query = this.props.location.query;
    return (
      <div>
        <Filters {...{
          fetchData,
          setFilter,
          filters,
          query,
          params
        }}/>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}

export default connect(select)(FiltersContainer);
