import * as types from './types';

export function setPreference(key, value) {
  return (dispatch: () => void) => {
    console.log(key, value)
    dispatch({
      type: types.SET_SETTING,
      payload: {
        [key]: value
      }
    })
  };
}
