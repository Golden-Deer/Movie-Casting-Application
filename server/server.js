const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors({
    credentials: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', require('../src/routes/index'));

app.use('/', require('../src/routes/mainController'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));