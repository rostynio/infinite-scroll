import urls from '../../constants/urls';
import {
  GET_BEERS_LIST_INIT,
  GET_BEERS_LIST_SUCCESS,
  GET_BEERS_LIST_FAIL,
  REMOVE_BEERS_FROM_LIST,
  SET_CURRENT_BEER
} from '../../store/types';

const getBeersListInit = () => ({
  type: GET_BEERS_LIST_INIT
});

const getBeersListSuccess = payload => ({
  type: GET_BEERS_LIST_SUCCESS,
  payload
});

const getBeersListFail = () => ({
  type: GET_BEERS_LIST_FAIL
});

export const setCurrentBeer = payload => ({
  type: SET_CURRENT_BEER,
  payload
});

export const removeBeersFromList = payload => ({
  type: REMOVE_BEERS_FROM_LIST,
  payload
});

export const getBeersList = (pageNumber = 1) => dispatch => {
  dispatch(getBeersListInit());

  const request = fetch(`${urls.getBeerList}?page=${pageNumber}`);

  request
    .then(res => res.json())
    .then(data => {
      dispatch(getBeersListSuccess(data));
    })
    .catch(err => {
      dispatch(getBeersListFail());
    });
};
