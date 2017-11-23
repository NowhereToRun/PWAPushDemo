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
  "endpoint": "https://fcm.googleapis.com/fcm/send/fWUyTBS8cAI:APA91bGJITMXJ7zkTTsr6CUzcrSwohyUM38qaJlSH5rKJFz1GYZdKHQOXJ4PnuhJx4vmytqsJOnESop6XhhPDhuPdiUUGf3r9RsXBIb2hSh9s5c0ZzOGjG8vBwhhDu0jBUNXqys6jwYP",
  "expirationTime": null,
  "keys": {
    "p256dh": "BO46YIjAt4I4gOEa174v8YD6Bu_PxWawf2SiG2MklxHEtoOG2JdaU7PHvh4rYhKQ692Yxfz8pL4vV1TDrTFfAJg=",
    "auth": "UdcodSolwPU83xc4uDVpaQ=="
  }
}



webpush.sendNotification(pushSubscription, 'Your Push Payload Text');

