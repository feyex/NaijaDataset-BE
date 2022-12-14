
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//use mongoose library to set up the database connection with MongoDB. We can also use Mongoose to save the data in the database using Mongoose ORM.
const mongoose = require('mongoose'), 
config = require('./DB');
 
//controllers for models
const tweetRoute = require('./routes/tweets-route');
const yorubaRoute = require('./routes/yoruba-route');
const userRoute = require('./routes/user-route');


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// api routes
app.use('/tweet', tweetRoute);
app.use('/api', yorubaRoute);
app.use('/v1', userRoute);

// start server
const port = process.env.PORT;

const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});