import {
  GET_BEERS_LIST_INIT,
  GET_BEERS_LIST_SUCCESS,
  GET_BEERS_LIST_FAIL,
  REMOVE_BEERS_FROM_LIST,
  SET_CURRENT_BEER
} from '../../store/types';

const initialState = {
  beerList: [],
  isLoading: false,
  currentBeer: {}
};

const beerList = (state = initialState, action) => {
  switch (action.type) {
    case GET_BEERS_LIST_INIT:
      return { ...state, isLoading: true };

    case GET_BEERS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        beerList: [...state.beerList, ...action.payload]
      };

    case GET_BEERS_LIST_FAIL:
      return { ...state, isLoading: false };
    case REMOVE_BEERS_FROM_LIST:
      let filteredArray = state.beerList.filter(
        beer => !action.payload.some(id => id === `${beer.id}`)
      );
      return { ...state, beerList: [...filteredArray] };
    case SET_CURRENT_BEER:
      const currentBeer = state.beerList.find(
        beer => beer.id === action.payload
      );
      return { ...state, currentBeer };
    default:
      return state;
  }
};

export default beerList;
