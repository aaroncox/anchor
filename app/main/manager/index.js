import { BrowserWindow } from 'electron';

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

export default { createManager };
