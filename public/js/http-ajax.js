/*
    globals XMLHttpRequest
    1. Create the xhr
    2. Open the xhr to url and VERB
    3. Setup
    3.1 Send Headers
    4. Attach to ready event
    5. Send the request
*/
const getElement = element =>
    document.querySelector(element);
const getAllElements = element =>
    document.querySelectorAll(element);

const generatedLoader = loader();
const $peopleElement = getElement('#people');

const url = `${location.protocol}//${location.hostname}:${location.port}`
const ajax = request => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = request.url;
    const VERB = request.verb;
    const body = request.body;
    const requestHeaders = request.requestHeaders || null;
    //  2. Open the xhr to url and VERB
    console.log(VERB);
    xhr.open(VERB, url, true);

    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    /*
        3. Setup
        3.1 Send Headers
    */
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.withCredentials = true;
    //  4. Attach to ready event
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        switch (0 | (xhr.status / 100)) {
            case 2:
                if (xhr.responseText !== "OK") {
                    const people = JSON.parse(xhr.responseText);
                    resolve(people);
                }

                resolve(xhr.responseText);
                break;
            case 4:
            case 5:
                reject(xhr.onerror);
                break;

        }
    };
    // xhr.onerror = err => console.log(err)
    //  5. Send the request
    xhr.send(body);
});

function getAll() {
    const preloader = loader();
    $peopleElement.appendChild(preloader);

    ajax({
        url: `${url}/people`,
        verb: "GET"
    }).then(({ data }) => {
        $peopleElement.removeChild(preloader);
        addToDom(data)
    })
        .catch(console.log)
}


// function getAllUsers() {
//     ajax({
//         url: `http://localhost:3003/all-users`,
//         verb: "GET"
//     })
//     .then(addToDom)
//     .catch(console.log)
// }

function getInterviewers() {
    const preloader = loader();
    $peopleElement.appendChild(preloader);

    ajax({
        url: "http://localhost:8080/api/interviewer/all",
        verb: "GET"
    })
        .then(({interviewers}) => {
            $peopleElement.removeChild(preloader);
            return interviewers.map(({email}) => ({ email }))
        })
        .then(addToDom)
}

function addToDom(array) {
    const people = array;

    people
        .map(person =>
            createPersonElement(person))
        .forEach($person =>
            $peopleElement.appendChild($person))
}

function createPersonElement(person) {
    const $person = document.createElement('div');

    $person.textContent = person.email;

    return $person
}

function addPerson() {
    const person = {};
    const elements = [...getAllElements('input')];

    elements.forEach(el => {
        person[el.id] = el.value;
    });

    ajax({
        url: `${url}/people`,
        body: JSON.stringify(person),
        verb: "POST"
    })
        .then(getAll)
        .catch(console.log)
}

function loader() {
    const container = document.createElement('div');
    const preloaderImage = document.createElement('img');

    container.className = 'loader-container';
    preloaderImage.src = 'https://s-media-cache-ak0.pinimg.com/originals/4f/9b/63/4f9b6352fa82dfe82e27a2c52989aaa9.gif';

    container.appendChild(preloaderImage);

    return container;
}


window.onload = function () {
    getAll();
    getInterviewers();
    // getAllUsers();
}


var a = {
    x: 5,
    y: {
        x: 5,
        z: 3
    },
    z: 3
};

var b = Object.assign({}, a);
var c = Object.assign({}, b);
console.log(a, b, c);

b.z = 5;

c.y.x = 6;

console.log(a, b, c);


function objCopy(obj) {
    var keys = Object.keys(obj);
    var newObj = {};

    keys.map(key => {
        newObj[key] = obj[key];
    });

    return newObj
}