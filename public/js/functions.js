(function() {
    const calcButton = document.querySelector('#sum-button');
    const findPrimesButton = document.querySelector('#find-primes');

    findPrimesButton.addEventListener('click', findPrimes)
    calcButton.addEventListener('click', calcNumbers);


    function findPrimes() {
        const start = document.querySelector('#start').value - 0;
        const end = document.querySelector('#end').value - 0;
        const $primes = document.querySelector('#primes');

        const primes = hasPrimes(start, end);
        $primes.textContent = primes.join(', ');
    }

    function hasPrimes(start, end) {
        const primes = [];

        for(let i = start; i <= end; i++) {
            isPrime(i) && primes.push(i);
        }

        return primes;
    }

    const isPrime = num => {
        if (num < 2) {
            return false;
        }

        if (num === 2) {
            return true
        } else if (num % 2 === 0) {
            return false;
        }

        for (var i = 3; i*i <= num; i += 2) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }
    function calcNumbers() {
        const inputValue = document.querySelector('#array').value;
        const array = parseArray(inputValue);
        const sum = array.reduce((acc, value) => {
            acc = acc + value;
            return acc;
        },0)

        document.querySelector('#sum').textContent = sum;
    }

    function parseArray(data, pesho) {
        const array = data.split(/[,?\s+]+/g);
        const parsedArray = []

        for(let i = 0; i < array.length; i++) {
            if (isNaN(array[i])) {
                throw (new Error('Input must contain only numbers'));
                break;
            }

            parsedArray.push(array[i] - 0);
        }

        return parsedArray;
    }
})();