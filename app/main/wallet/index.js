import { ipcMain } from 'electron';
import _ from 'lodash';

const Store = require('electron-store');
const steem = require('steem');

class Wallet {
  constructor(network = 'steem') {
    this.wallet = new Store({
      defaults: {},
      name: network
    });
  }

  setKey(event, password, account, type, key) {
    // Determine the public key for this private key
    const publicKey = steem.auth.wifToPublic(key);
    // Save the keys within the wallet file
    this.wallet.set({
      // Record this as the current key for this type
      [`accounts.${account}.current.${type}`]: key,
      // Add new key to keystore
      [`accounts.${account}.keystore.${publicKey}`]: key
    });
    // Broadcast the success event to react
    event.sender.send('walletKeySetSuccessAction', account, type);
  }
}

const wallet = new Wallet();

// IPC event triggers
ipcMain.on('setKey', (event, password, account, type, key) => wallet.setKey(event, password, account, type, key));

export default { wallet };
