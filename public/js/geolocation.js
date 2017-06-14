(function() {
    const googleMapKey = `&key=AIzaSyCPjctqDWfKIyGmW7ersGliDTPNot8LlTQ`;
    const myPromise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
            resolve(pos);
        })

    })

    const appendToDom = mapFootPrint => {
        const $mapContainer = document.querySelector('#google-map');
        const $mapImage = document.createElement('img');
        const { width, height } = $mapContainer.getBoundingClientRect();

        $mapImage.src = mapFootPrint;
        $mapContainer.appendChild($mapImage);

        // return $mapContainer;
    }

    const createMapLink = ({latitude, longitude, timestamp}) =>
        `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=500x500&sensor=false&markers=color:red%7Clabel:G%7C${latitude},${longitude}${googleMapKey}`;


    const parsePosition = data => {
        const { coords: { latitude, longitude }, timestamp} = data;

        return {
            latitude,
            longitude,
            timestamp
        }
    }

    function delay(time, map) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(map), time)
        });
    }

    function fade($el) {
        $el.style.display = 'none';
    }

    myPromise
        .then(parsePosition)
        .then(createMapLink)
        .then(appendToDom)
        // .then(map => delay(3000, map))
        // .then(fade)


    const fibonacciSequence = `function* fibonacci() {
            var fn1 = 0;
            var fn2 = 1;
            while (true) {
                var current = fn1;
                fn1 = fn2;
                fn2 = current + fn1;
                var reset = yield current;
                if (reset) {
                    fn1 = 0;
                    fn2 = 1;
                }
            }
        }

        var sequence = fibonacci();
        console.log(sequence.next().value);     // 0
        console.log(sequence.next().value);     // 1
        console.log(sequence.next().value);     // 1
        console.log(sequence.next().value);     // 2
        console.log(sequence.next().value);     // 3
        console.log(sequence.next().value);     // 5
        console.log(sequence.next().value);     // 8
        console.log(sequence.next(true).value); // 0`;

        const $fibonacciDiv = document.querySelector('#fibonacci');
        $fibonacciDiv.textContent = fibonacciSequence;

})();