import { BrowserWindow } from 'electron';

const parse = require('url-parse');
const path = require('path');
const log = require('electron-log');

const createAnchor = (resourcePath, url = false) => {
  log.info('anchor link: creating');

  const anchor = new BrowserWindow({
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
      anchor.loadURL(`file://${path.join(resourcePath, 'renderer/anchor/index.html')}#/${ops}/${meta}`);
    } else {
      log.info('anchor base64 failed');
      log.info(parsed);
    }
  }

  anchor.webContents.on('did-finish-load', () => {
    log.info('anchor link: loaded');
    anchor.show();
    anchor.focus();
  });

  return anchor;
};

export default { createAnchor };
