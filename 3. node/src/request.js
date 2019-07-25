const http = require('http');
const params = require('./params');

const connectionOptions = {
    host: 'localhost',
    port: 3000,
    path: '/'
};

async function sendRequest() {
    try {
        const type = await params.requestType();
        const number = await params.requestsNumber();

        params.readline.close();

        if (type === 'par') {
            sendParallelRequests(number);
        } else {
            sendSequentialRequests(number);
        }
    } catch (err) {
        console.log(err);
    }
}

function sendParallelRequests(requestsNumber) {

    for (let i = 1; i <= requestsNumber; i++) {
        console.log('request No ', i);
        http.get(connectionOptions, (response) => console.log(response.statusCode));
    }
}

function sendSequentialRequests(requestsNumber, i) {
    if (i === undefined) {
        i = 0
    }
    if (i++ >= requestsNumber) {
        return
    }
    console.log('request No ', i);

    http.get(connectionOptions, (res) => {
        console.log(res.statusCode);
        sendSequentialRequests(requestsNumber, i)
    })
}

sendRequest()