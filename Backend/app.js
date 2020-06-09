var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var donationsRouter = require('./routes/donate');
var newsRouter = require('./routes/news');

var app = express();


// To query /v2/everything
// You must include at least one q, source, or domain

// /* GET home page. */
// app.get('/', function(req, res, next) {
//   newsapi.v2.everything({
//     q: 'Covid',
//     language: 'en',
//     sortBy: 'relevancy',
//     page: 1
//   }).then(response => {
//     var news = response.articles;
//     var titleArray = [];
//     var descriptionArray = [];
//     var urlArray = [];
//     var imageArray = [];

//     for(let i = 0; i < news.length; i++){
//       descriptionArray.push(news[i].description);
//       titleArray.push(news[i].title);
//       urlArray.push(news[i].url);
//       imageArray.push(news[i].urlToImage);

//     }

//     for(let i = 0; i < 20; i++){
//       // descriptionArray.push(news[i].description);
//       // titleArray.push(news[i].title);
//       // urlArray.push(news[i].url);
//       // imageArray.push(news[i].urlToImage);
//       // var title = "title"+i;
//       // var description = "description"+i;
//       // var image = "image"+i;
//       // var url = "url"+i;
//       res.render('index', { title: titleArray[i], description: descriptionArray[i], image: imageArray[i], url: urlArray[i] });
//     }
    
//     // res.json(imageArray);
//     /*
//       {
//         status: "ok",
//         articles: [...]
//       }
//     */
//   });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/donate', donationsRouter);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// var Twitter = require('twitter');
// const express = require('express');
// const server = express();

// //Accessing the Twitter API
// var client = new Twitter({
//     consumer_key: 'SMJ6sqJas3CVJgV7K2SDvgsqB',
//     consumer_secret: 'RC0Kbuj2fYM3d4XaFoDEbfrhG8J8K0JxZ25FJgwgFV0h1Z0RUH',
//     access_token_key: '1255883163307565057-GuGRqCYfzecqlyqXyDLLNzSulrlSBR',
//     access_token_secret: '7T2Ue6uukZYXNep8l6ybHdvzLvoOQfYhMg4WoUcZ5kpoK'
// });

// //Using express to utilize searching
// server.get("/api/tweets/:search", function(req,res){
//     /* searchParam is the keyword to be searched (entered by the user)
//        on Twitter to generate 50 tweets that consist of the specific entered keyword */
//     let searchParam = {q: req.params.search, count: 50};//req.params.search};
//     client.get('search/tweets', searchParam, function(error, data, response){
//         if(error){
//             // If keyword is not found
//             res.send("KEYWORD NOT FOUND!");
//         } else {
//             let statuses = data.statuses;
//             // Array consisting of 50 tweets whose text includes the keyword
//             var tweetArray = [];
//             // The selected tweets are converted to words and stored in the wordArray
//             var wordArray = [];
//             // Array storing words as per occurence frequency to generate a tweet
//             var outputArray = [];
//             var myMap = new Map();
//             for(let i = 0; i < statuses.length; i++){
//                 let text = statuses[i].text;
//                 tweetArray.push(text);
//             }
//             let count = 0;
//             let wordCounter = 1;
//             let charCount = 0;
//             // All words from the tweets are stored in the word array
//             for(let i = 0; i < tweetArray.length; i++){
//                 let word = "";
//                 for(let j = 0; j < tweetArray[i].length; j++ ){
//                     // If the tweet just has one word, that word is 
//                     // pushed onto the array and we move onto the next tweet
//                     if(j === tweetArray[i].length-1 && wordCounter === 1){
//                         wordArray.push(tweetArray[i]);
//                         break;
//                     }
//                     // If a space in the tweet is encountered, the word 
//                     // is isolated and added to the wordArray
//                     if(tweetArray[i].charAt(j) === " "){
//                         wordArray.push(word);
//                         count = count + 1;
//                         wordCounter++;
//                         word = "";
//                     } else {
//                         word += tweetArray[i].charAt(j);
//                     }

//                 }
//             }
//             //A map stored all the words as the keys along with their number of occurence as values
//             for(let i = 0; i < wordArray.length; i++){
//                 if(myMap.has(wordArray[i])){
//                     myMap.set(wordArray[i], myMap.get(wordArray[i])+1)
//                 } else 
//                 myMap.set(wordArray[i],1);
//             }

//             // New sorted map as per values which are frequency of occurences
//             const sortedMap = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));
            

//             // Traversing the sorted map (as per frequency table)
//             for (let [key, value] of sortedMap.entries()) {
//                 // All words with some commonly used special characters
//                 // are not utilized for making our tweet
//                 if(!(key.includes("\\")) && !(key.includes("\/")) && !(key.includes("\@")) && 
//                                         !(key.includes("\.")) && !(key.includes("RT"))&& 
//                                                     !(key.includes("\|"))&& !(key.includes("#")) 
//                                                    && !(key.includes(":"))){
//                     // Last character space is left for a "full stop"                  
//                     if(charCount >= 279){
//                         break;
//                     }
//                     //If we have less than 10 characters left, we select a word with a length that will
//                     // make the tweet exactly 279 characters so that we can apply the "full stop" and print the 
//                     // 280 character tweet.
//                     if (charCount > 270) {
//                         if(280 - charCount - 1 === 0){
//                             break;
//                         }
//                         if(key.length === 280 - charCount - 1){
//                             outputArray.push(key);
//                             charCount += key.length;
//                             break;
//                         } else {
//                             continue;
//                         }
//                     } else {
//                         if(charCount + key.length < 280){
//                             outputArray.push(key);
//                             charCount += key.length;
//                             outputArray.push(" ");
//                             charCount += 1; 
//                         } else {
//                             continue;
//                         }
                           
//                     } 
//                 }
//             }
//             // ouputString just gets each word and space inside of outputArray
//             // concatenated within itself
//             var outputString = "";
//             for (let i = 0; i< outputArray.length; i++){
//                 outputString += outputArray[i];
//             }
//             outputString += ".";
//             res.send(outputString);
//         }
//     })
    
// })

// // Listen on port 5000
// server.listen(5000, ()=>{
//     console.log("Connected to port 5000!")
// });