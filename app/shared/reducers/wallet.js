import * as types from '../actions/types';

export default function wallet(state = {}, action) {
  switch (action.type) {
    case types.IPC_WALLET_KEY_SET:
      console.log('Key succesfully set', action); // eslint-disable-line no-console
      return state;
    default:
      return state;
  }
}
