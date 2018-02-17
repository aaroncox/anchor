/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

import { app, BrowserWindow, crashReporter, Menu, Tray } from 'electron';
import i18n from 'i18next';
import Backend from 'i18next-sync-fs-backend';
import sprintf from 'i18next-sprintf-postprocessor';
import LanguageDetector from 'i18next-electron-language-detector';
import { reactI18nextModule } from 'react-i18next';

const path = require('path');
const log = require('electron-log');
const util = require('util');


let dirname = __dirname;
if(process.mainModule.filename.indexOf('app.asar') == -1) {
  log.info("running in debug without asar, modifying path");
  dirname = path.join(dirname, '../');
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

let tray = null;
let menu = null;
let manager = null;
let anchor = null;

// bind all console.log to electron-log
const cl = console.log.bind(console);
console.log = (...args) => {
  log.info(args);
  cl(...args);
};

log.info('app: initializing');

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();

  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);

  // Log all messages
  log.transports.file.level = 'info';
}

// crash reporter for failures (NYI)
crashReporter.start({
  productName: 'Anchor',
  companyName: '',
  submitURL: '',
  uploadToServer: false
});

// localization provider
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .use(sprintf)
  .init({
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    fallbackNS: 'common',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: path.join(dirname, 'renderer/assets/locales/{{lng}}/{{ns}}.json'),
      jsonIndent: 2
    },
    overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
    react: {
      wait: true
    }
  });
global.i18n = i18n;

// Don't display the dock/task icon (NYI - display when a non always on top window is rendered)
app.dock.hide();

// Register as the default steem:// protocol client
app.setAsDefaultProtocolClient('steem');

// main exceptions to electron-log
app.on('uncaughtException', (error) => {
  log.error(error);
});

// main start
app.on('ready', async () => {
  log.info('app: ready');
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    log.info('development mode enabled');
    await installExtensions();
  }
  createTray(); // Initialize the tray
  createMenu(); // Initialize the tray menu (browser)
});

// catch protocol links
app.on('open-url', (event, url) => {
  log.info(`anchor link: ${url}`);
  createAnchor(url);
});

// debug event logging
app.on('window-all-closed', () => {
  log.info('app: window-all-closed');
});
app.on('will-finish-launching', () => { log.info('app: will-finish-launching'); });
app.on('before-quit', () => { log.info('app: before-quit'); });
app.on('will-quit', () => { log.info('app: will-quit'); });
app.on('quit', () => { log.info('app: quit'); });

const createTray = () => {
  log.info('creating tray menu');

  console.log(__dirname);
  let trayIcon = path.join(dirname, 'renderer/assets/images/logo.png');
  log.info(trayIcon);

  tray = new Tray(trayIcon);

  tray.on('click', (event) => {
    toggleWindow();
    if (process.defaultApp && event.ctrlKey) {
      if (!menu.webContents.isDevToolsOpened()) {
        menu.openDevTools({ mode: 'detach' });
        log.info('Anchor > Tray Menu > DevTools');
      }
    }
  });

  tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Debug',
        click: () => {
          menu.openDevTools({ mode: 'detach' });
          log.info('Anchor > Tray Menu > DevTools');
        }
      },
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
  log.info('tray menu: creating');

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

  menu.loadURL(`file://${path.join(dirname, 'renderer/tray/index.html')}#/`);

  menu.webContents.on('did-finish-load', () => {
    log.info('tray menu: loaded');
    menu.openDevTools({ mode: 'detach' });
  });

  menu.on('blur', () => {
    if (!menu.webContents.isDevToolsOpened()) {
      menu.hide();
    }
  });
};

const createManager = () => {
  log.info('manager: creating');

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

  manager.loadURL(`file://${path.join(dirname, 'renderer/manager/index.html')}#/`);

  manager.webContents.on('did-finish-load', () => {
    log.info('manager: loaded');
    manager.openDevTools({ mode: 'detach' });
    manager.show();
    manager.focus();
  });

  manager.on('close', () => {
    manager = null;
  });
};

const createAnchor = (url = false) => {
  log.info('anchor link: creating');

  anchor = new BrowserWindow({
    width: 640,
    height: 395,
    center: true,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: false,
    alwaysOnTop: true
  });

  let ops = false;
  let meta = false;

  if (url) {
    const parse = require('url-parse');
    const parsed = parse(url, true);

    if (parsed.host === 'sign') {
      const opsExp = /\/tx\/((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)/;
      const opsMatch = opsExp.exec(parsed.pathname);
      if (opsMatch[1]) {
        [, ops] = opsMatch;
      }
      const metaExp = /^#((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)$/;
      const metaMatch = metaExp.exec(parsed.hash);
      if (metaMatch[1]) {
        [, meta] = metaMatch;
      }
    }

    if (ops && meta) {
      log.info('anchor base64 valid');
      log.info(ops);
      anchor.loadURL(`file://${path.join(dirname, 'renderer/anchor/index.html')}#/${ops}/${meta}`);
    } else {
      log.info('anchor base64 failed');
      log.info(parsed);
    }
  }

  anchor.webContents.on('did-finish-load', () => {
    log.info('anchor link: loaded');
    anchor.openDevTools({ mode: 'detach' });
    anchor.show();
    anchor.focus();
  });

  anchor.on('close', () => {
    anchor = null;
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

global.showManager = showManager;
