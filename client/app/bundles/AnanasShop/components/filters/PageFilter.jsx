import React from 'react';
import ReactPaginate from 'react-paginate';
import Immutable from 'immutable';
import _ from 'lodash';

export default class PageFilter extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickHandler');
  }

  clickHandler(e) {
    let { updateFilter, filter } = this.props;
    let page = e.selected + 1;
    let newFilter = filter.set('page', page).set('params', Immutable.List([page]))
    updateFilter(newFilter);
  }

  render() {
    let breakLabel = <a>...</a>
    let { totalCount, page, totalPages } = this.props.filter.toJS();
    return(
      <div>
        <nav>
          Товаров: <b>{totalCount}</b>
          <ReactPaginate
            containerClassName='pagination'
            clickCallback={this.clickHandler}
            breakLabel={breakLabel}
            breakClassName='disabled'
            activeClassName='active'
            forceSelected={page - 1}
            pageNum={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5} />
        </nav>
      </div>
    );
  }
}
