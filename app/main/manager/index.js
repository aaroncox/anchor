import { BrowserWindow, ipcMain } from 'electron';

const path = require('path');
const log = require('electron-log');

const createManager = (resourcePath, route = '/', closable = true) => {
  log.info('manager: creating');

  const manager = new BrowserWindow({
    closable,
    width: 960,
    height: 540,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true
  });

  manager.loadURL(`file://${path.join(resourcePath, 'renderer/manager/index.html')}#${route}`);

  manager.webContents.on('did-finish-load', () => {
    log.info('manager: loaded');
    manager.show();
    manager.focus();
  });

  return manager;
};

// Make method externaly visible
ipcMain.on('ping', (event, arg1, arg2, arg3) => {
  console.log('Ping', arg1, arg2, arg3); // eslint-disable-line no-console
  event.sender.send('pong', arg1, arg2, arg3);
});

export default { createManager };
