const init_state = {
  locationData: [],
  searchResults: [],
  mode: '',
  userpreferences: {},
  confirmedtkts: [],
  personalDetails: {},
};
export const actionTypes = {
  SET_LOCATION_DATA: 'SET_LOCATION_DATA',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SAVE_USERPREFERENCES: 'SAVE_USERPREFERENCES',
  SAVE_CONFIRMED_TKTS: 'SAVE_CONFIRMED_TKTS',
  SAVE_PESONAL_DETAILS: 'SAVE_PESONAL_DETAILS',
};
const reducer = (state = init_state, action: any) => {
  switch (action.type) {
    case actionTypes.SET_LOCATION_DATA:
      return {
        ...state,
        locationData: action.payload,
      };
    case actionTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload.data,
        mode: action.payload.mode,
      };
    case actionTypes.SAVE_USERPREFERENCES:
      return {
        ...state,
        userpreferences: action.payload,
      };
    case actionTypes.SAVE_CONFIRMED_TKTS:
      return {
        ...state,
        confirmedtkts: action.payload,
      };

    case actionTypes.SAVE_PESONAL_DETAILS:
      return {
        ...state,
        personalDetails: action.payload,
      };
    default: {
      return state;
    }
  }
};
export default reducer;
