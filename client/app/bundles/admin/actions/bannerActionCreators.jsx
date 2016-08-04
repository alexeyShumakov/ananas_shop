import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';
import axios from '../utils/axios';

export function setBanners(bannerItems) {
  return {
    type: actionTypes.SET_BANNERS,
    bannerItems
  }
}

export function fetchBanners() {
  return dispatch => {
    return axios.get('/api/v1/banner_items').then(
      responce => {
        let bannerItems = Immutable.fromJS(responce.data.banner_items);
        dispatch(setBanners(bannerItems));
      });
  };
}

export function createBanner(banner_item) {
  return dispatch => {
    return axios.post('/api/v1/banner_items', banner_item).then(
      responce => {
        let bannerItems = Immutable.fromJS(responce.data.banner_items);
        dispatch(setBanners(bannerItems));
      });
  };
}

export function deleteBanner(id) {
  return dispatch => {
    return axios.delete(`/api/v1/banner_items/${id}`).then(
      responce => {
        let bannerItems = Immutable.fromJS(responce.data.banner_items);
        dispatch(setBanners(bannerItems));
      });
  };
}
