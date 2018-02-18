import createElectronStorage from 'redux-persist-electron-storage';

const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
  whitelist: [
    'settings'
  ]
};

export default persistConfig;
