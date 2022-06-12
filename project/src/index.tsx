import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './components/app/app';
import HistoryRouter from '../src/components/history-router/history-router';
import browserHistory from './browser-history';
<<<<<<< HEAD
=======
import { fetchReviewsAction } from './store/api-actions';

store.dispatch(fetchReviewsAction());
>>>>>>> c81edab11eeb3f4cbea93529e666b372787e3844

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
