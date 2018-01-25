(function() {
  'use strict';

  function firebaseInit() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDy3Pk9a1Bve1jVLvWjVFsaqUKbW76OzgI",
      authDomain: "push-b0f29.firebaseapp.com",
      databaseURL: "https://push-b0f29.firebaseio.com",
      projectId: "push-b0f29",
      storageBucket: "push-b0f29.appspot.com",
      messagingSenderId: "574020133020"
    };
    firebase.initializeApp(config);

    // Retrieve Firebase Messaging object.
    const messaging = firebase.messaging();
    console.log(messaging);

    // 申请接收通知的权限
    messaging.requestPermission()
      .then(function() {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
      })
      .catch(function(err) {
        console.log('Unable to get permission to notify.', err);
      });


    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken()
      .then(function(currentToken) {
        console.log('currentToken', currentToken);
        if (currentToken) {
          // sendTokenToServer(currentToken);
          // updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          // updateUIForPushPermissionRequired();
          // setTokenSentToServer(false);
        }
      })
      .catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        // showToken('Error retrieving Instance ID token. ', err);
        // setTokenSentToServer(false);
      });

    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(function() {
      messaging.getToken()
        .then(function(refreshedToken) {
          console.log('Token refreshed.', refreshedToken);
          // Indicate that the new Instance ID token has not yet been sent to the
          // app server.
          // setTokenSentToServer(false);
          // Send Instance ID token to app server.
          // sendTokenToServer(refreshedToken);
          // ...
        })
        .catch(function(err) {
          console.log('Unable to retrieve refreshed token ', err);
          // showToken('Unable to retrieve refreshed token ', err);
        });
    });
  }






  function showNotification() {
    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          console.log('success');
        });
      }
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function() {
        console.log('Service Worker Registered');
      })
      .catch(function(err) {
        console.log('Service Worker Failed. ');
      });
    // showNotification();
  }

  window.addEventListener('load', function() {
    firebaseInit();
  });
})();