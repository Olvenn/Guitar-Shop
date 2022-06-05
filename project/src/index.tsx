import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './components/app/app';
import HistoryRouter from '../src/components/history-router/history-router';
import browserHistory from './browser-history';
import { fetchReviewsAction } from './store/api-actions';


store.dispatch(fetchReviewsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
