const express = require("express");
const twitterApi = require('./twitterApi.js');

const app = express();
const port = 8080;

require('dotenv').config();

const ids = [];

app.use(express.json());
app.use(express.urlencoded( { extended:false} ));

twitterApi.init();

//Searching the tweets and showing it.
app.post('/search', (req,res) => {
    const searchData = req.body.searchData;
    const optionData = req.body.optionData;

    //Get the id using the twitterApi and then send it using the res.send
    twitterApi.callAPI(searchData, optionData).then((data) => {
        if(data.statuses.length !== 0){
            const currentId = data.statuses[0].id;
            if(!ids.includes(currentId)){
                ids.push(currentId);
                console.log(data.statuses[0].id_str);
                res.send({"id": data.statuses[0].id_str});
            } else{
                res.send({"id": "Duplicate ID"});
            }
        } else {
            res.send({"id": "Sorry the tweet is not found."});
        }
    }).catch((er) => {
        if(er) throw er;
    })
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

