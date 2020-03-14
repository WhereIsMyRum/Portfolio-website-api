const express = require('express')
const app = express()
const PORT = 8080
const routes = require('./routes');
const { redisLookup } = require('./middlewares');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(redisLookup)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes.router)


app.listen(PORT)