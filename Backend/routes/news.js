var express = require('express');
var router = express.Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('b6716ede3ac64eefa89aa6f289df786f');
const Covidapi = require('novelcovid');
Covidapi.settings({
  baseUrl: 'https://disease.sh'
})

router.get('/', function(req, res, next) {
    Covidapi.countries({sort:'cases'}).then(response => {
  
      var countries = [];
      let i = 0;
      for (i = 0; i < 20; i++){
        countries.push(response[i]);
      }
      newsapi.v2.topHeadlines({
        // q: 'Covid' , 
        q: 'coronavirus',
        language: 'en',
        country: 'us'
      }).then(response => {
            var news = [];
            for (var i of response.articles){
              news.push(i)
            } 
            newsapi.v2.topHeadlines({
              // q: 'Covid' , 
              q: 'covid',
              language: 'en',
              country: 'us'
            }).then(response => {
                  for (var i of response.articles){
                    news.push(i)
                  } 
                  newsapi.v2.topHeadlines({
                    // q: 'Covid' , 
                    q: 'pandemic',
                    language: 'en',
                    country: 'us'
                  }).then(response => {
                        for (var i of response.articles){
                          news.push(i)
                        } 
                        newsapi.v2.everything({
                          q: 'Covid',
                          language: 'en',
                          sources:'abc-news',
                          sortBy: 'relevancy',
                          page: 1
                        }).then(response => {
                              for (var i of response.articles){
                                if (i.description.includes("<") || i.description.includes("sport") || i.description.includes("sports")){
                                  continue;
                                } else {
                                  news.push(i)
                                }
                              } 
                              res.render('index', {Countries: countries, News: news});
                            });
                      });
                });
            
          });
    });  
  });

  module.exports = router;