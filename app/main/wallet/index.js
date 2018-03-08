import { ipcMain } from 'electron';
import _ from 'lodash';

const Store = require('electron-store');
const steem = require('steem');
const CryptoJS = require("crypto-js");

class Wallet {
  constructor(network = 'steem') {
    this.wallet = new Store({
      defaults: {},
      name: network
    });
  }

  setKey(event, password, account, type, key) {
    let wif = key;
    // Is this a valid key?
    const isValidKey = steem.auth.isWif(wif);
    if (isValidKey) {
      // Determine the public key for this private key
      const publicKey = steem.auth.wifToPublic(key);
      if (password) {
        // Encrypt the private key with the provided password
        wif = CryptoJS.AES.encrypt(wif, password).toString();
      }
      // Save the keys within the wallet file
      this.wallet.set({
        // Record this as the current key for this type
        [`accounts.${account}.current.${type}`]: wif,
        // Add new key to keystore
        [`accounts.${account}.keystore.${publicKey}`]: wif
      });
      // Broadcast the success event to react
      event.sender.send('walletKeySetSuccessAction', account, type);
    } else {
      // Broadcast the success event to react
      event.sender.send('walletKeySetFailAction', account, type, 'invalid_key');
    }
  }
  }
}

const wallet = new Wallet();

// IPC event triggers
ipcMain.on('setKey', (event, password, account, type, key) => wallet.setKey(event, password, account, type, key));

export default { wallet };
