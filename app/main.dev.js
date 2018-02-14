/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

import { app, BrowserWindow, Menu, Tray } from 'electron';

const path = require('path');

const assetsDirectory = path.join(__dirname, 'assets');

let tray = null;
let menu = null;
let manager = null;

app.dock.hide();

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();

  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }
  createTray();
  createMenu();
});

app.on('window-all-closed', () => {
  app.quit();
});

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'icon.png'));
  tray.on('click', (event) => {
    toggleWindow();
    if (menu.isVisible() && process.defaultApp && event.ctrlKey) {
      if (!menu.webContents.isDevToolsOpened()) {
        menu.openDevTools({ mode: 'detach' });
      }
    }
  });
  tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => {
          app.quit();
        }
      }
    ]);
    tray.popUpContextMenu(contextMenu);
  });
};

const createMenu = () => {
  menu = new BrowserWindow({
    width: 300,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false
    }
  });

  menu.loadURL(`file://${path.join(__dirname, 'index.html#/')}`);

  menu.on('blur', () => {
    if (!menu.webContents.isDevToolsOpened()) {
      menu.hide();
    }
  });
};

const createManager = () => {
  manager = new BrowserWindow({
    width: 960,
    height: 540,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true
  });

  manager.loadURL(`file://${path.join(__dirname, 'index.html#/manager')}`);

  manager.webContents.on('did-finish-load', () => {
    manager.show();
    manager.focus();
  });

  manager.on('close', () => {
    manager = null;
  });
};

const getWindowPosition = () => {
  const windowBounds = menu.getBounds();
  const trayBounds = tray.getBounds();
  const width = (trayBounds.width / 2) - (windowBounds.width / 2);
  const x = Math.round(trayBounds.x + width);
  const y = Math.round(trayBounds.y + trayBounds.height + 4);
  return { x, y };
};

const toggleWindow = () => {
  if (menu.isVisible()) {
    menu.hide();
  } else {
    showWindow();
  }
};

const showWindow = () => {
  const position = getWindowPosition();
  menu.setPosition(position.x, position.y, false);
  menu.show();
  menu.focus();
};

const showManager = () => {
  if (!manager) {
    createManager();
  }
  if (menu.isVisible()) {
    menu.hide();
  }
};

const devToolsLog = (s) => {
  console.log(s);
  if (menu && menu.webContents) {
    menu.webContents.executeJavaScript(`console.log("${s}")`);
  }
};

global.showManager = showManager;
