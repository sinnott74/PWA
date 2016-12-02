// import ToasterSingleton from '../libs/ToasterSingleton';
import DatabaseSingleton from '../libs/DatabaseSingleton';
import CustomEventPolyfill from '../libs/CustomEventPolyfill';

export default class Controller {

  constructor(registerServiceWorker = true) {
    if (registerServiceWorker) {
      this.registerServiceWorker();
    }
    CustomEventPolyfill.invoke();
    DatabaseSingleton.getDatabase();
  }

  registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      // Service worker is not supported on this platform
      return;
    }

    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    }).then((registration) => {
      console.log('Service worker is registered.');

      var isUpdate = false;

      // If this fires we should check if there's a new Service Worker
      // waiting to be activated. If so, ask the user to force refresh.
      if (registration.active) {
        isUpdate = true;
      }

      registration.onupdatefound = function(updateEvent) {
        console.log('A new Service Worker version has been found...');

        // If an update is found the spec says that there is a new Service
        // Worker installing, so we should wait for that to complete then
        // show a notification to the user.
        registration.installing.onstatechange = function(event) {
          if (this.state === 'installed') {
            var message, toastEvent;

            if (isUpdate) {
              message = 'App updated. Restart for the new version.';
              toastEvent = new CustomEvent('toast', {'detail': message});
              document.dispatchEvent(toastEvent);
              // ToasterSingleton.getToaster().toast(
              //     'App updated. Restart for the new version.');
            } else {
              message = 'App ready for offline use.';
              toastEvent = new CustomEvent('toast', {'detail': message});
              document.dispatchEvent(toastEvent);
              // ToasterSingleton.getToaster().toast(
              //     'App ready for offline use.');
            }
          }
        };
      };
    })
    .catch((err) => {
      console.log('Unable to register service worker.', err);
    });
  }

  loadScript(url) {
    return new Promise((resolve, reject) => {
      var script = document.createElement('script');
      script.async = true;
      script.src = url;

      script.onload = resolve;
      script.onerror = reject;

      document.head.appendChild(script);
    });
  }

  loadCSS(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'text';
      xhr.onload = function(e) {
        if (this.status === 200) {
          var style = document.createElement('style');
          style.textContent = xhr.response;
          document.head.appendChild(style);
          resolve();
        } else {
          reject();
        }
      };
      xhr.send();
    });
  }
}
