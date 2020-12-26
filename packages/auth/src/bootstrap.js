import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath],
  });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App history={history} onSignIn={onSignIn} />,
    el,
  );

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      if (history.location.pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
};

// Running in isolation
if (process.env.NODE_ENV === 'development') {
  const element = document.querySelector('#auth-dev-root');

  if (element) {
    mount(element, { defaultHistory: createBrowserHistory() });
  }
}

// Running though the container
export { mount };
