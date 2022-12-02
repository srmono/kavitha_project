import { actionTypes } from './reducer';

export const prefetchDispatcher = (dispatch:any, payload:any) => {
  dispatch({ type: actionTypes.SET_LOCATION_DATA, payload });
};
export const searchApiDispatcher=(dispatch:any, payload:any) => {
  dispatch({ type: actionTypes.SET_SEARCH_RESULTS,payload });
}
export const saveUserpreferences = (dispatch:any, payload:any) => {
  dispatch({ type: actionTypes.SAVE_USERPREFERENCES,payload})
}