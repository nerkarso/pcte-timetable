import App from 'App';
import Toast from 'elements/Toast';
import ClassnameProvider from 'hooks/ClassnameContext';
import SlideProvider from 'hooks/SlideContext';
import ThemeProvider from 'hooks/ThemeContext';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'serviceWorker';
import 'styles/index.scss';
import { SWRConfig } from 'swr';

ReactDOM.render(
  <ThemeProvider>
    <ClassnameProvider>
      <SlideProvider>
        <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <App />
          <Toast id="toast-update" style={{ display: 'none' }} isToastShown={true}>
            Updating...
          </Toast>
        </SWRConfig>
      </SlideProvider>
    </ClassnameProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onInstall: () => {
    // Show toast update
    document.querySelector('#toast-update').style.display = 'block';
  },
  onSuccess: () => {
    // Hide toast update
    document.querySelector('#toast-update').style.display = 'none';
  },
  onUpdate: (worker) => {
    // Force the waiting service worker to become the active service worker
    worker.postMessage({
      type: 'SKIP_WAITING',
    });
    // Reload the web page
    window.location.reload(true);
  },
});
