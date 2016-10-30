var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
var passport = require('passport');
var express = require('express');
var request = require('request-promise');

var app = express();

//AWS
var FITBIT_CLIENT_ID = "227WYF";
var FITBIT_CLIENT_SECRET = "28e96c62a095734ac15d667c085ce2dc";

//local
// var FITBIT_CLIENT_ID = "227WM4";
// var FITBIT_CLIENT_SECRET = "f4111700b64948de968dd79be0a175ba";

var router = express.Router();

app.set('view engine', 'ejs');

var tokenId = '';
var profileId = '';

app.use(passport.initialize());
app.use(passport.session());
app.use(router);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FitbitStrategy({
        clientID:     FITBIT_CLIENT_ID,
        clientSecret: FITBIT_CLIENT_SECRET,
        callbackURL: "http://52.89.68.106:8080/auth/fitbit/callback"
        //callbackURL: "http://localhost:8080/auth/fitbit/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, {token: accessToken, profile: profile});
        });
    }
));

app.get('/auth/fitbit', passport.authenticate('fitbit', { scope: ['activity','heartrate','profile'] }));

app.get( '/auth/fitbit/callback', passport.authenticate('fitbit'),
    function(req, res) {
        tokenId =  req.user.token;
        profileId = req.user.profile.id;
        res.redirect('/heartRate');
    }
);

app.get('/heartRate', function (req, res) {
    var bearer = 'Bearer '+ tokenId;
    var options = {
        method: 'GET',
        url: 'https://api.fitbit.com/1/user/'+profileId+'/activities/heart/date/today/today.json',
        headers: {
            'Authorization': bearer
        }
    };
    request(options)
        .then( function (response) {
            console.log(response["activities-heart"]);
            res.render('activity', {response: response});
        })
        .catch( function (error) {
            //console.log(error);
        });
});

app.get('/logout', function (req, res){
        req.logout();
        res.redirect('/');
});

app.get('/steps', function (req, res){
    var bearer = 'Bearer '+ tokenId;
    var options = {
        method: 'GET',
        url: 'https://api.fitbit.com/1/user/'+profileId+'/activities/date/2016-10-29.json',
        headers: {
            'Authorization': bearer
        }
    };
    request(options)
        .then( function (response) {
            res.render('activity', {response: response});
        })
        .catch( function (error) {
            //console.log(error);
        });
});

app.get('/', function(req, res) {
    res.render('login');
});

app.listen(8080, function() {
    console.log("✔ Express server listening on port %d in %s mode", 8080, app.get('env'));
});
