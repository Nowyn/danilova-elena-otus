const sum = (x) => {
    let result = 0;

    function f(x) {
        if (x) {
            result += isNaN(x) ? 0 : x;

            return f;
        } else {
            return result;
        }
    }

    return f(x);
};

console.log(sum(1)(2)(3)(4)(5)());
console.log( sum('sadfghb')('ref')(3)(4)(5)());
console.log( sum(1)({})(3)(4)(5)());