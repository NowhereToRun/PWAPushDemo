(function () {
    'use strict';

    const precacheBtn = document.querySelector('.j_precache_btn');

    function bindEvent() {
        precacheBtn.addEventListener('click', function () {
            fetch('https://my_fake.api.com').then(function (response) {
                console.log(response);
            }).catch(function (e) {
                console.log("Oops, error");
            });
        })
    }

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
            .register('./serviceWorker.js')
            .then(function () {
                console.log('Service Worker Registered');
                bindEvent();
            });
        showNotification();
    }


})();
