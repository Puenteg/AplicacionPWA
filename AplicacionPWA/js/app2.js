if (window.caches) {
    caches.open("cache1");
    caches.open("cache2");
    caches.has("cache2").then(console.log);
    //caches.delete("cache1").then(console.log);

    caches.open("cache1").then(cache => {
        //cache.add("/index.html");
        cache.addAll([
            "/index.html",
            "/crear.html",
            "/js/app1.js",
            "/js/app.js"
        ]).then(resp => {
            cache.delete("/js/app1.js");
        });

        cache.match("/index.html", "/crear.html")
            .then(resp => resp.text())
            .then(console.log);
    });

    caches.keys().then(console.log);
}
