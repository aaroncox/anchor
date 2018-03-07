import { send } from 'redux-electron-ipc';
import * as types from './types';

export function setKey(password, account, type, key) {
  return (dispatch: () => void) => {
    console.log('action', password, account, type, key)
    dispatch(send('setKey', password, account, type, key));
  };
}
