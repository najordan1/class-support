const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/class', require('./routes/classperiod.router'));
app.get('/', (req, res) => {
    res.send('Hello World!')
});


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3030;
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
