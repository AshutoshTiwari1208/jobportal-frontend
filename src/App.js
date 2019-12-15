import React from 'react';
import './App.css';
import { Router } from './Router';
import { Provider } from 'react-redux';
import configstore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configstore;

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>  
    </Provider>
  );
}

export default App;
