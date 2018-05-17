//The Twitter Library
var Twit = require('twit');

//Bringing the configuration file in play
var T = new Twit(require(`./config.js`));

//Adding what I want to search
var physicsSearch = {
  q:"Physics",
  count: 1,
  result_type: "recent",
  filter: "safe",
};

//This function finds the latest tweey and retweets
function retweetLatest() {
  T.get('search/tweets', physicsSearch, function (error, data){
    //log out any errors and response
    console.log(error, data);
    //If search request to server had no errors
    if(!error){
      //then we grab id of the tweet we want to retweets
      var retweetId = data.statuses[0].id_str;
      // we tell twitter we want to retweets
      T.post('statuses/retweet/' + retweetId, { }, function (error, response){
        if (response) {
          console.log('Success! Check your bot, it should have retweeted something.')
        }
        //If theres error with twitter call we print it count
        if (error) {
          console.log('There wwas an error with Twitter:', error);
        }
      });
    }
    //Try to retweet something as soon as the program is launched

  });
};

//retweeting
retweetLatest();

// add then every 5 minutes in milliseconds
setInterval(retweetLatest, 1000*60*5);
