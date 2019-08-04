const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

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
            numberInputValue = Number(numberInputValue);
            if (isNaN(numberInputValue) || numberInputValue <= 0) {
                reject('The value should be a positive number');
                readline.close();
            }
            resolve(numberInputValue);
        });
    });
};

module.exports.requestType = requestType;
module.exports.requestsNumber = requestsNumber;
module.exports.readline = readline;
