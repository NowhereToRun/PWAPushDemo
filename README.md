## [web-push](./web-push)
使用PWA推荐的push方式`sw.pushManager.subscribe`注册订阅  

#### 使用前提  
1. 必须翻墙才可得到订阅信息，得到订阅信息后发送给服务器。  
2. 只要有订阅信息，发送给服务器，不翻墙也可收到推送（虽然好像没什么用）。  

#### 其他 
代码中写死了服务端公钥  
并没有真实的向服务端发送订阅信息，仅仅把订阅信息写在了屏幕上，需复制到服务端进行推送  

## [ws-push](./ws-push)
本意是利用websocket进行推送通知，暂时没有wss的服务器，代码不可用。  

## push-server  
测试代码，使用了web-push。  
代码仅仅是简单的推送，不含别的逻辑。

## [precache](./precache)
测试，点击提前加载资源。  

## [sina](./sina)
测试，点击提前加载资源。  

## [empty](./empty)
测试，空service-worker，测试添加主屏图标 