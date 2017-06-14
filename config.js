const  path = require('path');

const rootPath = path.normalize(path.join(__dirname, './'));

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mysql://localhost:3306/js_app',
        port: 3000,
        host: 'localhost'
    },
    production : {
        rootPath,
        db: process.env.MONGO_DB_CONN_STRING,
        port: process.env.port
    }

}