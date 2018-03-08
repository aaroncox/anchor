import * as types from '../actions/types';

export default function wallet(state = {}, action) {
  switch (action.type) {
    case types.IPC_WALLET_KEY_SET_SUCCESS: {
      return Object.assign({}, state, {
        lastMessage: {
          key: 'wallet_key_set_success',
          data: action.payload,
        }
      });
    }
    case types.IPC_WALLET_KEY_SET_FAIL: {
      return Object.assign({}, state, {
        lastMessage: {
          key: 'wallet_key_set_fail',
          data: action.payload,
        }
      });
    }
    default: {
      return state;
    }
  }
}
