const express = require("express");
const twitterApi = require('./twitterApi.js');

const app = express();
const port = 8080;

require('dotenv').config();

let option = 'hashtag';
let ids = [];

app.use(express.json());
app.use(express.urlencoded( { extended:false} ));

twitterApi.init();
// app.use(express.static('public'));

// app.get('/', (req,res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

//Searching the tweets and showing it.
app.post('/search', (req,res) => {
    let searchData = req.body.searchData;
    //Get the id using the twitterApi and then send it using the res.send
    twitterApi.callAPI(searchData, option).then((data) => {
        if(data.statuses.length !== 0){
            let currentId = data.statuses[0].id;
            //console.log(currentId);
            if(!ids.includes(currentId)){
                ids.push(currentId);
                //console.log(ids);
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

//Changing the option
app.post('/option', (req,res) => {
    option = req.body.optionData;
    //console.log(option);
    res.send({"option": option});
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

