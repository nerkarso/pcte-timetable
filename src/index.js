import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ClassNameProvider } from './context/classname-context';
import { SlideProvider } from './context/slide-context';
import { ThemeProvider } from './context/theme-context';
import Toast from './elements/Toast';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';

ReactDOM.render(
  <ThemeProvider>
    <ClassNameProvider>
      <SlideProvider>
        <App />
        <Toast
          id="toast-update"
          style={{ display: 'none' }}
          isToastShown={true}
        >
          Updating...
        </Toast>
      </SlideProvider>
    </ClassNameProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onInstall: () => {
    // Show toast update.
    document.querySelector('#toast-update').style.display = 'block';
  },
  onSuccess: () => {
    // Hide toast update.
    document.querySelector('#toast-update').style.display = 'none';
  },
  onUpdate: worker => {
    // Force the waiting service worker to become the active service worker.
    worker.postMessage({
      type: 'SKIP_WAITING'
    });

    // Reload the web page.
    window.location.reload(true);
  }
});
