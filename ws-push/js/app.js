(function () {
    'use strict';

    function showNotification() {
        Notification.requestPermission(function (result) {
            if (result === 'granted') {
                navigator.serviceWorker.ready.then(function (registration) {
                    console.log('success');
                });
            }
        });
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service_worker.js')
            .then(function () {
                console.log('Service Worker Registered');
                fetch('https://my_fake.api.com').then(function (response) {
                    return response;
                }).then(function (data) {
                    console.log(data);
                }).catch(function (e) {
                    console.log("Oops, error");
                });
            });

        showNotification();

    }
})();
