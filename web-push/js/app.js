(function () {
    'use strict';
    let isSubscribed = false;
    let swRegistration = null;

    const applicationServerPublicKey = 'BMXkvqsQKJ2Rr43QbChms_q13NA1RhrrJnMH_CT0a5xxE4Zz5khisWpEJl6jNYIrHG4Yw7rwWyji-yiMRrMB77I';
    const pushButton = document.querySelector('.j_push_btn');

    function showNotification() {
        Notification.requestPermission(function (result) {
            if (result === 'granted') {
                navigator.serviceWorker.ready.then(function (registration) {
                    console.log('success');
                });
            }
        });
    }

    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }


    function initialiseUI() {
        pushButton.addEventListener('click', function () {
            pushButton.disabled = true;
            if (isSubscribed) {
                // TODO: Unsubscribe user
            } else {
                subscribeUser();
            }
        });

        // Set the initial subscription value
        swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                isSubscribed = !(subscription === null);

                updateSubscriptionOnServer(subscription);

                if (isSubscribed) {
                    console.log('User IS subscribed.');
                } else {
                    console.log('User is NOT subscribed.');
                }

                updateBtn();
            });
    }

    function updateBtn() {
        if (isSubscribed) {
            pushButton.textContent = 'Disable Push Messaging';
        } else {
            pushButton.textContent = 'Enable Push Messaging';
        }
        pushButton.disabled = false;
    }


    //用户没有订阅时 执行订阅
    function subscribeUser() {
        console.log(123);
        const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        swRegistration.pushManager.subscribe({
            userVisibleOnly: true,    // 必须编写此值并且此值必须为 true，会在发送推送时显示通知
            applicationServerKey: applicationServerKey
        })
            .then(function (subscription) {
                console.log('User is subscribed:', subscription);
                updateSubscriptionOnServer(subscription);
                isSubscribed = true;
                updateBtn();
            })
            .catch(function (err) {
                console.log('Failed to subscribe the user: ', err);
                updateBtn();
            });
    }

    // 取消订阅
    function unsubscribeUser() {
        swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            })
            .catch(function (error) {
                console.log('Error unsubscribing', error);
            })
            .then(function () {
                updateSubscriptionOnServer(null);

                console.log('User is unsubscribed.');
                isSubscribed = false;

                updateBtn();
            });
    }


    function updateSubscriptionOnServer(subscription) {
        // TODO: Send subscription to application server

        const subscriptionJson = document.querySelector('.j_subscription_json');
        // const subscriptionDetails = document.querySelector('.js-subscription-details');
        if (subscription) {
            subscriptionJson.textContent = JSON.stringify(subscription);
            // subscriptionDetails.classList.remove('is-invisible');
        } else {
            // subscriptionDetails.classList.add('is-invisible');
        }
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function (swReg) {
                console.log('Service Worker Registered');
                swRegistration = swReg;
                initialiseUI();
            });

        // showNotification();

    }
})();
