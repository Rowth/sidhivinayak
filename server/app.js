const express = require('express');
const createError = require('http-errors');
const db = require('./database/db');
// const dotenv = require('dotenv').config();
const Routes = require('./Router/Router')
// const db = require('./database/db');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }))
app.use(Routes);
//app.use(express.static(__dirname+ './uploads'));

app.get('/api', (req, res) => {
//    res.setHeader('Access-Control-Allow-Origin', '*');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	res.send('Hello karishma!');
});
port = 9000;
app.listen(port, () => {
    console.log(`Server is running on.....${port}`)
})
