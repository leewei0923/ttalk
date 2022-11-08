import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@arco-design/web-react/dist/css/arco.css';
import './global.css';
import SocketContextProviders from './contexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <SocketContextProviders>
      <App />
    </SocketContextProviders>
  </BrowserRouter>
);
