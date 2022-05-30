import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import HistoryRouter from '../src/components/history-route/history-route';
import browserHistory from './browser-history';
import ErrorMessage from './components/error-message/error-message';
import { fetchGuitarsAction, fetchReviewsAction } from './store/api-actions';

store.dispatch(fetchGuitarsAction());
store.dispatch(fetchReviewsAction());
// store.dispatch(fetchFavoritesAction());
// store.dispatch(checkAuthAction());
// eslint-disable-next-line no-console
console.log(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/app/app';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'));
