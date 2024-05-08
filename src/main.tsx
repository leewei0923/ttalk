import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@arco-design/web-react/dist/css/arco.css';
import './global.css';
import SocketContextProviders from './contexts';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <SocketContextProviders>
//         <App />
//       </SocketContextProviders>
//     </Provider>
//   </BrowserRouter>
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <SocketContextProviders>
      <App />
    </SocketContextProviders>
  </Provider>
</BrowserRouter>
  // </React.StrictMode>
);

