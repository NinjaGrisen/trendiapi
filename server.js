const express = require("express");
const app = express();
const router = express.Router();

var googleTrends = require('google-trends-api');

app.get("/api/trend/:id", (req, res) => {
    googleTrends.interestOverTime({
        keyword: req.params.id, 
        startTime: new Date(Date.now() - (1 * 60 * 60 * 1000))}, function(err, results) {
        if(err) {
            res.send(err);
            //console.error('there was an error!', err)
        }
        else {
            req.profile = JSON.parse(results);
        }
    }).then(function() {
        res.send(req.profile['default'].timelineData[0].value);
    })
})


app.listen(3074);
