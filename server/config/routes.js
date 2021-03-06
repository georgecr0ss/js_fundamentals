const controllers = require('../controllers');

const people = [
    { name: 'Late', email: 'Late@gmail.com', age: 25, isCool: true, id: 1 },
    { name: 'Gogo', email: 'Gogo@gmail.com', age: 25, isCool: true, id: 2 },
    { name: 'Mitq', email: 'Mitq@gmail.com', age: 25, isCool: true, id: 3 },
    { name: 'Pesho', email: 'Pesho@gmail.com', age: 25, isCool: true, id: 4 },
    { name: 'Chavdar', email: 'Chavdar@gmail.com', age: 25, isCool: true, id: 5 },
    { name: 'Asparuh', email: 'Asparuh@gmail.com', age: 25, isCool: true, id: 6 },
    { name: 'Penka', email: 'Penka@gmail.com', age: 25, isCool: true, id: 1 },
    { name: 'Denis', email: 'Denis@gmail.com', age: 25, isCool: true, id: 2 },
    { name: 'Vasilena', email: 'Vasilena@gmail.com', age: 25, isCool: true, id: 3 },
    { name: 'Stoqn', email: 'Stoqn@gmail.com', age: 25, isCool: true, id: 4 },
    { name: 'MartoKriviq', email: 'MartoKriviq@gmail.com', age: 25, isCool: true, id: 5 },
    { name: 'IliqnDurvoto', email: 'IliqnDurvoto@gmail.com', age: 25, isCool: true, id: 6 }

];

module.exports = app => {

    //   app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    //   });

    app.get('/', (req, res) => res.render('index'));

    app.get('/promises', (req, res) => res.render('promises'));

    app.get('/http-ajax', (req, res) => res.render('http-ajax'));

    app.get('/modules', (req, res) => res.render('modules'));

    app.get('/functions-iife', (req, res) => res.render('functions-iife'));

    app.get('/closures', (req, res) => res.render('closures'));

    app.post('/closures', (req, res) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        })

        req.on('end', () => {
            body = JSON.parse(body);
            addBook(body, res);
        });

        res.sendStatus(200);
    });

    // Test GET verb via XMLHttpRequest
    app.get('/people', (req, res) => res.send({ data: people }));

    app.post('/people', (req, res) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        })

        req.on('end', () => {
            body = JSON.parse(body);
            addPerson(body, res);
        });

        function addPerson({name, age, isCool}, res) {
            const id = people.length + 1;
            const Person = { name, age, isCool, id };
            people.unshift(Person)

            res.sendStatus(200)
        }
    });

    app.all('*', (req, res) => {
        res.render('error');
    });
}