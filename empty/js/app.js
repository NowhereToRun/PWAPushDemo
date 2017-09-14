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

    function addHome() {
        var button = document.querySelector('.j_show_prompt');
        button.addEventListener('click', function () {
            if (deferredPrompt != null) {
                // 异步触发横幅显示
                deferredPrompt.prompt();
                // 检测用户的安装行为
                deferredPrompt.userChoice.then(function (choiceResult) {
                    console.log(choiceResult.outcome);
                    alert(choiceResult.outcome);
                });
                deferredPrompt = null;
            }
        });

        window.addEventListener('beforeinstallprompt', function (e) {
            // beforeinstallprompt event fired
            e.userChoice.then(function (choiceResult) {
                if (choiceResult.outcome === 'dismissed') {
                    console.log('用户取消安装应用');
                    alert('dismissed');
                }
                else {
                    console.log('用户安装了应用');
                    alert('accept');
                }
            });
        });

        var deferredPrompt = null;
        window.addEventListener('beforeinstallprompt', function (e) {
            // 将事件返回存储起来
            deferredPrompt = e;
            alert(deferredPrompt);
            // 取消默认事件
            e.preventDefault();
            return false;
        });
    }

    function init() {
        $('#j_card_tnews').on('click','a', function(){
            var h1 = $(this).find('h2');
            var title = h1.length !== 0? h1.text() : 'Not found';
            $('#infoDom').text(title);
        });
    }


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service_worker.js')
            .then(function () {
                alert('Service Worker Registered');
                console.log('Service Worker Registered');
                showNotification();
            })
            .catch(function(err){
                alert('Service Worker Register Failed');
            })
    }

    window.addEventListener('load', function () {
        init();
    })
})();
