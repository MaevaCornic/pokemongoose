require('dotenv').config();

const express = require('express');
const router = require('./app/router');

const app = express();

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});