const http = require('http');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const connectionOptions = {
    host: 'localhost',
    port: 3000,
    path: '/'
};

const requestType = () => {
    return new Promise((resolve, reject) => {
        readline.question('Requests type (par/seq): ', (typeInputValue) => {
            if (typeInputValue !== 'par' && typeInputValue !== 'seq') {
                reject('Wrong type');
                readline.close();
            }
            resolve(typeInputValue);
        });
    });
};

const requestsNumber = () => {
    return new Promise((resolve, reject) => {
        readline.question('Requests number: ', (numberInputValue) => {
            if (numberInputValue <= 0) {
                reject('The value should be a positive number');
                readline.close();
            }
            resolve(numberInputValue);
        });
    });
};

async function sendRequest() {
    try {
        const type = await requestType();
        const number = await requestsNumber();

        readline.close();

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
        http.get(connectionOptions, (response) => {
            console.log(response.statusCode);
        });
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