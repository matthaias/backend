var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var normalizeUrl = require('normalize-url');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var mongoose = require('mongoose');
mongoose.connect(`mongodb://mongo-dev-1,mongo-dev-2/test`, console.log);

var Url = mongoose.model('url', { url: String, image: String });

app.get('/', function(req, res, next) {
    Url.find(function(err, data) {
        if (err) {
            console.log(err);
        }

        res.json(data);
    });
});

app.post('/', function(req, res, next) {
    var href = normalizeUrl(req.body.url);
    var url = new Url({ url: href });
    url.save(function(err) {
        if (err) {
            console.log(err);
        }

        res.json(url);
    });
});

app.delete('/:id', function(req, res, next) {
    Url.remove({ _id: req.params.id }, function(err) {
        if (err) {
            return console.log(error);
        }

        res.json();
    });
});

app.listen(8080, function() {
    console.log('Example app listening');
});
