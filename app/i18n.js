const electron = require('electron');
const { remote } = electron;
const i18n = remote.getGlobal('i18n');
export default i18n;
