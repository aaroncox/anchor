import { send } from 'redux-electron-ipc';
import * as types from './types';

export function setKey(password, account, type, key) {
  return (dispatch: () => void) => {
    dispatch(send('setKey', password, account, type, key));
  };
}
