import createElectronStorage from 'redux-persist-electron-storage';

const persistConfig = {
  key: 'anchor-config',
  storage: createElectronStorage(),
  whitelist: [
    'settings'
  ]
};

export default persistConfig;
