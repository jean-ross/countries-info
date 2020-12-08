import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';

import api from './services/api';
import Routes from './routes';

import './App.css';
import 'leaflet/dist/leaflet.css';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={api}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
