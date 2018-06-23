//jamil is awesome!
var express = require('express');
//var mysql = require('./gitAuth.js');
var axios = require('axios'); 
var urlCreator = require('./url.js'); 

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
//var request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/',function(req,res,next){
    //search by language
    var context = {};
    context.repos = [];
    var idx = 0;
    var url = urlCreator(['c++']);
    axios.get(url)
        .then(response => {
            while(context.repos.length < 5 && idx < response.data.items.length){
                var r = response.data.items[idx]; 
                if(r.open_issues_count > 0){
                    context.repos.push(response.data.items[idx]);
                }
                idx++;
            }
            res.render('home', context);
        })
        .catch(error => {
            console.log(error); 
            res.render('500');
        }); 
});

app.get('/repos', function(req, res, next){
    //search by language
    var context = {};
    context.repos = [];
    var idx = 0;
    var url = urlCreator(['python']);
    axios.get(url)
        .then(response => {
            while(context.repos.length < 10 && idx < response.data.items.length){
                var r = response.data.items[idx]; 
                if(r.open_issues_count > 0){
                    context.repos.push(response.data.items[idx]);
                }
                idx++;
            }
            res.render('home', context);
        })
        .catch(error => {
            console.log(error); 
            res.render('500');
        }); 
}); 

app.post('/',function(req,res,next){
    var context = {};

    res.send('home', context);

});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
