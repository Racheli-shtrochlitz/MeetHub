import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'; 
import { BrowserRouter } from 'react-router-dom';
import  userSlice  from './Store/UserSlice';

const store = configureStore({
  reducer: {
    user: userSlice, 
  }
});

const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PrimeReactProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PrimeReactProvider>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
