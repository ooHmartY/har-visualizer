import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';

import App from './App';
import './index.css';

(() => {
    function mountApp(Component) {
        render(
            (<AppContainer>
              <Component />
            </AppContainer>),
            document.getElementById('root'),
        );
    }

    mountApp(App);

    if (module.hot) {
        module.hot.accept('./App', () => {
            mountApp(App);
        });
    }
})();
