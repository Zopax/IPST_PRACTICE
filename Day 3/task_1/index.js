function delayPromise(delay, message) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(message);
        }, delay);
    });
}
delayPromise(2000, "Hello after 2 seconds!")
    .then(function (message) {
    console.log(message);
});
