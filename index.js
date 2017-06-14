const express = require('express');

const app = express();
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const PORT = process.env.PORT || 3000;

require('./server/config/express')(app, config);
require('./server/config/routes')(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

