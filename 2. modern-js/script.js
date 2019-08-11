let fn1 = () => {
    console.log('fn1');
    console.log('resolving', 5);
    return Promise.resolve(5)
};

let fn2 = () => new Promise(resolve => {
    console.log('fn2');
    console.log('resolving', 10);
    setTimeout(() => resolve(10), 1000)
});

let fn3 = () => new Promise(resolve => {
    console.log('fn3');
    console.log('resolving', 3);
    setTimeout(() => resolve(3))
});

function promiseReduce(asyncFunctions, reduce, initialValue) {
    return new Promise(async function (resolve, reject) {
        try {
            let value = initialValue;

            for (let element of asyncFunctions) {
                let result = await element();
                value = reduce(value, result);
            }
            resolve(value);
        } catch (error) {
            reject(error);
        }
    });
}

promiseReduce(
    [fn1, fn2, fn3],
    function (memo, value) {
        console.log('executing reduce...');
        console.log('memo =', memo);
        console.log('value =', value);
        console.log('returning: ' + memo + ' * ' + value + ' = ' + memo * value);
        return memo * value
    }, 1)
    .then((res) => console.log('result:', res))
    .catch(console.log);