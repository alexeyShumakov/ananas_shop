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
    let prev = String.fromCharCode(8592)
    let next = String.fromCharCode(8594)
    let { totalCount, page, totalPages } = this.props.filter.toJS();
    return(
      <div className='shop-pager'>
        <nav>
          <ReactPaginate
            containerClassName='pagination pagination-sm shop-pager__pagination pull-left'
            clickCallback={this.clickHandler}
            previousLabel={prev}
            nextLabel={next}
            breakLabel={breakLabel}
            breakClassName='disabled'
            activeClassName='active'
            forceSelected={page - 1}
            pageNum={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3} />
        </nav>
      </div>
    );
  }
}
