

// const dbRoute =
//     'mongodb+srv://dbUser:malloo4301@mycluster-puppf.mongodb.net/donationInfo?retryWrites=true&w=majority';//*
// mongoose.connect(dbRoute, { useNewUrlParser: true });//*
// let db = mongoose.connection;//*

// db.once('open', () => console.log('connected to the database'));//*

// // checks if connection with the database is successful
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));//*


var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next){
  console.log("Index Router");
});

module.exports = router;
