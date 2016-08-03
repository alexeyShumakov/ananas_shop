import Immutable from 'immutable';

import actionTypes from '../constants/filtersConstants';

export const $$initialState = Immutable.fromJS({
  filtersLoading: true,
  showcaseLoading: true,
  category: {},
  filters: [],
  products: []
});

export default function filtersReducer($$state = $$initialState, action) {
  const { loadingState, filter, filters, products, category, type } = action;

  switch (type) {
    case actionTypes.SET_FILTER:
      let newFilters = $$state.get('filters');
      $$state.get('filters').forEach((fltr, index, filters) => {
        if( filter.get('name') === fltr.get('name')) {
          newFilters = filters.set(index, filter);
        }
      });
      return $$state.set('filters', newFilters);

    case actionTypes.SET_FILTERS_LOADING:
      return $$state.set('filtersLoading', loadingState);

    case actionTypes.SET_FILTERS:
      return $$state.set('filters', filters);

    case actionTypes.SET_SHOWCASE_LOADING:
      return $$state.set('showcaseLoading', loadingState);

    case actionTypes.SET_PRODUCTS:
      return $$state.set('products', products);

    case actionTypes.SET_CATEGORY:
      return $$state.set('category', category);

    default:
      return $$state;
  }
}
