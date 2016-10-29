var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
var passport = require('passport');
var express = require('express');
var request = require('request-promise');

var app = express();

var FITBIT_CLIENT_ID = "227WYF";
var FITBIT_CLIENT_SECRET = "28e96c62a095734ac15d667c085ce2dc";

var router = express.Router();

var token = '';
var profileId = '';

app.set('view engine', 'ejs');

passport.use(new FitbitStrategy({
        clientID:     FITBIT_CLIENT_ID,
        clientSecret: FITBIT_CLIENT_SECRET,
        callbackURL: "http://52.89.68.106:8080/auth/fitbit/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        token = accessToken;
        profileId = profile.id;
        console.log('token-'+token);
        return done(null, accessToken);
    }
));

app.get('/auth/fitbit', passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile'] }));

app.get( '/auth/fitbit/callback', function(req, res) {
    var bearer = 'Bearer '+token
    var options = {
        method: 'GET',
        url: 'https://api.fitbit.com/1/user/-/activities/date/2016-01-26.json',
        headers: {
            'Authorization': bearer
        }
    };
    console.log(bearer);
    request(options)
        .then( function (response) {
            console.log('In response');
            response.render('activity', {error: false, body: response});
        })
        .catch( function (error) {
            console.log(error);
        });
});

app.listen(8080, function() {
    console.log("✔ Express server listening on port %d in %s mode", 8080, app.get('env'));
});
