//This file should not be accessible from the website, since this file has confidential information.
require('dotenv').config();

module.exports = {
    client: '',
    //Authorizing the twitter 
    init: () => {
        const Twitter = require('twitter');

        client = new Twitter({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token_key: process.env.ACCESS_TOKEN_KEY,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        });
    },

    //Searching the tweet
    callAPI: (query, option) => {
        query = (option === 'hashtag') ? '#' + query : query;
        query = (option === 'user') ? '@' + query : query;

        return client.get('search/tweets',
            { q: query, result_type: 'recent', count: 1 });
    }
}