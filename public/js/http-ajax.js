/*
    globals XMLHttpRequest
    1. Create the xhr
    2. Open the xhr to url and VERB
    3. Setup
    3.1 Send Headers
    4. Attach to ready event
    5. Send the request
*/
const url = `${location.protocol}//${location.hostname}:${location.port}`
const ajax = request => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = request.url;
    const VERB = request.verb;
    const body = request.body;
    const requestHeaders = request.requestHeaders || null;
    //  2. Open the xhr to url and VERB
    xhr.open(VERB, url, true);

    /*
        3. Setup
        3.1 Send Headers
    */
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.withCredentials = true;
    //  4. Attach to ready event
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }

        switch (0 | (xhr.status / 100)) {
            case 2:
                if(xhr.responseText !== "OK") {
                    const people = JSON.parse(xhr.responseText).data;
                    resolve(people) ;
                }

                resolve(xhr.responseText) ;
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

const getElement = element =>  document.querySelector(element);
const getAllElements = element =>  document.querySelectorAll(element);

function getAll() {
    ajax({
        url: `${url}/people`,
        verb: "GET"
    })
    .then(addToDom)
    .catch(console.log)
}


function getAllUsers() {
    ajax({
        url: `http://localhost:3003/all-users`,
        verb: "GET"
    })
    .then(addToDom)
    .catch(console.log)
}

function addToDom(array) {
    const people = array;
    const $peopleElement = getElement('#people');

    people
        .map(person =>
            createPersonElement(person))
        .forEach($person =>
            $peopleElement.appendChild($person))
}

function createPersonElement(person) {
    const $person = document.createElement('li');

    $person.textContent = person.name;

    return $person
}

function addPerson() {
    const person = {};
    const elements = [...getAllElements('input')];

    elements.forEach(el => {
        person[el.id] = el.value;
    });
    console.warn(person);
    ajax({
        url: `${url}/people`,
        body: JSON.stringify(person),
        verb: "POST"
    })
    .then(getAll)
    .catch(console.log)
}

window.onload = function() {
    getAll();
    getAllUsers();
}
