(function() {
  'use strict';

  function showNotification() {
    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          console.log('success');
        });
      }
    });
  }

  function addHome() {
    var button = document.querySelector('.j_show_prompt');
    button.addEventListener('click', function() {
      if (deferredPrompt != null) {
        // 异步触发横幅显示
        deferredPrompt.prompt();
        // 检测用户的安装行为
        deferredPrompt.userChoice.then(function(choiceResult) {
          console.log(choiceResult.outcome);
        });
        deferredPrompt = null;
      }
    });

    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt event fired
      e.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === 'dismissed') {
          console.log('用户取消安装应用');
        } else {
          console.log('用户安装了应用');
        }
      });
    });

    var deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', function(e) {
      // 将事件返回存储起来
      deferredPrompt = e;
      console.log(deferredPrompt);
      // 取消默认事件
      e.preventDefault();
      return false;
    });
  }

  function init() {
    $('#j_card_tnews').on('click', 'a', function() {
      var h1 = $(this).find('h2');
      var title = h1.length !== 0 ? h1.text() : 'Not found';
      $('#infoDom').text(title);
    });
  }


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service_worker.js')
      .then(function() {
        console.log('Service Worker Registered');
        showNotification();
      })
      .catch(function(err) {
        alert('Service Worker Register Failed');
      });

    setTimeout(() => {
      console.log('5秒后注销');
      navigator.serviceWorker.getRegistrations().then((regs) => {
        console.log(regs);
        regs.forEach((item) => {
          console.log(item.scope);
          item.unregister().then((msg) => {
            console.log(msg);
            console.log('注销成功');
          })
        })
      })

    }, 5000);
  }

  window.addEventListener('load', function() {
    init();
  })
})();