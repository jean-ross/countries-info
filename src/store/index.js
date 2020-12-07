import { createStore } from 'redux';
import countries from './reducer';

const store = createStore(countries);

export default store;