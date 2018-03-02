import * as types from '../actions/types';

export default function settings(state = {}, action) {
  switch (action.type) {
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    case 'IPC_PONG':
      console.log('Pong', action); // eslint-disable-line no-console
      return state;
    default:
      return state;
  }
}
