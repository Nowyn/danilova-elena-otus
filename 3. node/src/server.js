const http = require('http');

const port = 3000;
const server = http.createServer((request, response) => {

    const delay = 100;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Doing something...");
        }, delay);

    });

    promise.then((res) => {
        console.log(res);

        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end();
    });

    promise.catch((err) => {
        throw new Error(err);
    })

});

server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});

