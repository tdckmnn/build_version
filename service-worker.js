importScripts("/precache-manifest.f304b0b296064f8f948fc9a9aaf1c9d1.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self._precacheManifest = [].concat(self.__precacheManifest || []);

workbox.setConfig({
    debug: true
});

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

let click_open_url
self.addEventListener('push', function(event) {
  let push_message = event.data.json()
  // push notification can send event.data.json() as well
  click_open_url = push_message.notification.data.url
  const options = {
    body: push_message.notification.body,
    icon: push_message.notification.icon,
    image: push_message.notification.image,
    tag: 'alert'
  };
  event.waitUntil(self.registration.showNotification(push_message.notification.title, options));
});

self.addEventListener('notificationclick', function(event) {
  const clickedNotification = event.notification;
  clickedNotification.close();
  if ( click_open_url ){
    const promiseChain = clients.openWindow(click_open_url);
    event.waitUntil(promiseChain);
  }
});
