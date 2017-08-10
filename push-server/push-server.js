const webpush = require('web-push');

// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();

// webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
    'mailto:452242153@qq.com',
    'BHiRLVcpaLuTljrvciLogGRUWULvwLRl41igibZRh8Pxq20cY_uDDcHHD2rOUnxlQkkpk_LivTnLxbxuBnBTkQQ', //publicKey,
    'ImYa6CjrRlA5-Y63fNvRBnOAEvfplg9WQyTg8yGaW7c'//privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c6PYBog8xT8:APA91bFGT8OCTuIcluuQrTGS7HCQ7eygnDexGHSYaeu0Ne0AiPrWn9g3V1CV5a3UC96Yred75_Scqq1ExXcH-G2OZiJWv3blQZ9NktmG-8B611H0U6YTMbwOgmxB4-9o4QW7LUtr-Td3",
    "expirationTime": null,
    "keys": {
        "p256dh": "BASPiGttPuDtHc-9Q_ObU-zs0KI1uDtPp6vFqYX5oYlLZS7AwxsS-QoeoHHU_r0Fn8EuEO9Q5M1JjKzPzz3DFV8=",
        "auth": "h7W4trc0JQiHY6PZVRLG5g=="
    }
}



webpush.sendNotification(pushSubscription, 'Your Push Payload Text');