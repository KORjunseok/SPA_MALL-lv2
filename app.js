const express = require('express');
const connect = require('./schemas');
const routes = require('./routes');

const app = express();
const port = 3000;

connect();

app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(port, '서버가 실행되었습니다.');
});