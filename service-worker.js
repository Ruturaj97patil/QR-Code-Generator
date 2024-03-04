if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

if (workbox) {
    workbox.precaching.precacheAndRoute([
        '/',
        'C:/Users/Patil/Desktop/QR-Code-Generator/index.html',
        'C:/Users/Patil/Desktop/QR-Code-Generator/style.css',
        'C:/Users/Patil/Desktop/QR-Code-Generator/script.js',
        'C:/Users/Patil/Desktop/QR-Code-Generator/icon.png',
        'C:/Users/Patil/Desktop/QR-Code-Generator/manifest.json'
    ]);

    // Cache external dependencies
    workbox.routing.registerRoute(
        new RegExp('https://cdn\\.tailwindcss\\.com'),
        new workbox.strategies.StaleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        new RegExp('https://cdnjs\\.cloudflare\\.com'),
        new workbox.strategies.StaleWhileRevalidate()
    );
}
