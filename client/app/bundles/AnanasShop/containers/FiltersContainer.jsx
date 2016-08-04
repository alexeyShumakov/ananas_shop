import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import _ from 'lodash';
import * as filtersActionCreators from '../actions/filtersActionCreators';

import Filters from '../components/Filters';
import Category from '../components/Category';
import SidebarFilters from '../components/SidebarFilters';
import BottomFilters from '../components/BottomFilters';

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
    let { fetchData, setFilter, updateFilter, fetchCategory } = actions;

    let filters = $$filtersStore.get('filters');
    let category = $$filtersStore.get('category');
    let params = this.props.params;
    let query = this.props.location.query;
    return (
      <div className='row'>
        <div className='col-sm-3 hidden-xs' >
          <SidebarFilters {...{
            fetchData,
            setFilter,
            updateFilter,
            filters,
            query,
            params
          }}/>
        </div>
        <div className="col-sm-9">
          <Category {...{params, fetchCategory, category}}/>
          <Filters {...{
            fetchData,
            setFilter,
            updateFilter,
            filters,
            query,
            params
          }}/>
          {this.props.children}
          <BottomFilters {...{
            fetchData,
            setFilter,
            updateFilter,
            filters,
            query,
            params
          }}/>
        </div>
      </div>
    );
  }
}

export default connect(select)(FiltersContainer);
