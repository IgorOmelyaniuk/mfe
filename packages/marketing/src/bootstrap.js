import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const mount = (el) => {
  ReactDOM.render(
    <App />,
    el,
  );
};

// Running in isolation
if (process.env.NODE_ENV === 'development') {
  const element = document.querySelector('#dev-root');

  if (element) {
    mount(element);
  }
}

// Running though the container
export { mount };
