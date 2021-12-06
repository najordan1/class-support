const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/class', require('./routes/classperiod.router'));
app.use('/question', require('./routes/question.router'));
app.use('/student', require('./routes/student.router'));
app.use('/response', require('./routes/response.router'));
app.get('/', (req, res) => {
    res.send('Hello World!')
});


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3030;
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
