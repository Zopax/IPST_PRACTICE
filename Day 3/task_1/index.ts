function delayPromise(delay: number, message: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, delay);
    });
}
delayPromise(2000, "Hello after 2 seconds!")
  .then((message) => {
    console.log(message); 
  });

