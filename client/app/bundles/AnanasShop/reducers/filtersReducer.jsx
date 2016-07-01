import Immutable from 'immutable';

import actionTypes from '../constants/filtersConstants';

export const $$initialState = Immutable.fromJS({
  filtersLoading: true,
  filters: {
    categoryId: null,
    price: {
      min: 0,
      max: 100,
      minB: 0,
      maxB: 100
    }
  },
  showcaseLoading: true,
  products: []
});

export default function filtersReducer($$state = $$initialState, action) {
  const { loadingState, filters, price, categoryId, products, type } = action;

  switch (type) {
    case actionTypes.SET_FILTERS_LOADING:
      return $$state.set('filtersLoading', loadingState);

    case actionTypes.SET_FILTERS:
      return $$state.set('filters', filters);

    case actionTypes.SET_PRICE_FILTER:
      let tmp = $$state.setIn(['filters', 'price', 'minB'], price.min );
      tmp = tmp.setIn(['filters', 'price', 'maxB'], price.max );
      return tmp;

    case actionTypes.SET_CATEGORY_ID:
      return $$state.setIn(['filters', 'categoryId'], categoryId);

    case actionTypes.SET_SHOWCASE_LOADING:
      return $$state.set('showcaseLoading', loadingState);

    case actionTypes.SET_PRODUCTS:
      return $$state.set('products', products);

    default:
      return $$state;
  }
}
