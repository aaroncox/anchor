import { ipcMain } from 'electron';

const Store = require('electron-store');
const steem = require('steem');
const CryptoJS = require('crypto-js');

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

  // Retrieve the information about a key in the wallet
  getKey(password, account, type = 'posting') {
    console.log('importWallet', this.wallet, password, account, type);
  }

  // Check for the existence of a key by account + type
  hasKey(account, type = 'posting') {
    console.log('hasKey', this.wallet, account, type);
  }

  // Export wallet with "save as" prompt for user initiated backup files
  exportWallet(password) {
    console.log('exportWallet', this.wallet, password);
  }

  // Import and merge wallet with imported file
  importWallet(password) {
    console.log('importWallet', this.wallet, password);
  }

  // Sign a transaction using keys from within the wallet
  sign(password, account, ops) {
    console.log('sign', this.wallet, password, account, ops);
  }

  // Broadcast a signed transaction to the blockchain
  broadcast(tx) {
    console.log('broadcast', this.wallet, tx);
  }

  // combo of sign() + broadcast()
  commit(password, account, ops) {
    console.log('commit', this.wallet, password, account, ops);
  }
}

const wallet = new Wallet();

// IPC event triggers
ipcMain.on('setKey', (event, password, account, type, key) => wallet.setKey(event, password, account, type, key));

// stubs
ipcMain.on('getKey', () => {});
ipcMain.on('hasKey', () => {});
ipcMain.on('exportWallet', () => {});
ipcMain.on('importWallet', () => {});
ipcMain.on('sign', () => {});
ipcMain.on('broadcast', () => {});
ipcMain.on('commit', () => {});

export default { wallet };
