import { ApolloClient, InMemoryCache } from '@apollo/client';

const api = new ApolloClient({
  uri: 'https://countries-274616.ew.r.appspot.com/',
  cache: new InMemoryCache()
});

export default api;