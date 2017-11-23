const webpush = require('web-push');

// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();

// webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
  'mailto:452242153@qq.com',
  'BMXkvqsQKJ2Rr43QbChms_q13NA1RhrrJnMH_CT0a5xxE4Zz5khisWpEJl6jNYIrHG4Yw7rwWyji-yiMRrMB77I', //publicKey,
  'FlsnaJm0dRQOzlsfpX4xxQ0al9j5z6xyZy4kEsYqhe8' //privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/fXwxIQUaL9Y:APA91bE9ucyYY4EFaPlszLq-RZMFjMyXKck5YOEo8_WqBBSNOJEQQHdY3Cx8NJ_9ri83f6ViVrWZ1swUknVhDx2fLlaABnERtIy_3qL2EqR7m_uFW3tnokrhoSRSBkMAYRaGBNWGYFUV",
  "expirationTime": null,
  "keys": {
    "p256dh": "BLuDbvsVNVatjf3h6ThKHPr0ZD1FlxcIqfq4vt3c8VDMor2lDYMqgu6R_qo88kPrh_Eg63p977BLBwx6wB--hFA=",
    "auth": "UMMASNQwReAwKnlS8WNpRg=="
  }
}



webpush.sendNotification(pushSubscription, 'Your Push Payload Text');