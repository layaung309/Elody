const CACHE_NAME = "my-resume-v1";

const FILES_TO_CACHE = [
    "index.html",
    "style.css",
    "measurement converter.html",
    "Grading.html",
    "Change calculator.html",
    "distance.html",
    "My hobby (layaung).html",
    "icon-192.png",
    "icon-512.png"
];

self.addEventListener("install", function(event) {

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

});


self.addEventListener("fetch", function(event) {

    event.respondWith(
        caches.match(event.request)
        .then(function(response) {

            if(response) {
                return response;
            }

            return fetch(event.request);

        })
    );

});


self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys().then(function(cacheNames) {

            return Promise.all(

                cacheNames.map(function(cacheName) {

                    if(cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }

                })

            );

        })

    );

});