import React from 'react';
import './index.css';
import './utils/i18n.ts';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
