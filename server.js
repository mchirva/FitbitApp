var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
var passport = require('passport');
var express = require('express');
var request = require('request');

var app = express();

var FITBIT_CLIENT_ID = "227WYF";
var FITBIT_CLIENT_SECRET = "28e96c62a095734ac15d667c085ce2dc";

var router = express.Router();

var token = '';
var profileId = '';

passport.use(new FitbitStrategy({
        clientID:     FITBIT_CLIENT_ID,
        clientSecret: FITBIT_CLIENT_SECRET,
        callbackURL: "http://52.89.68.106:8080/auth/fitbit/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('yes');
        token = accessToken;
        profileId = profile.id;
        return done(req, user);
    }
));

app.get('/auth/fitbit', passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile'] }
    ));

app.get( '/auth/fitbit/callback', function(req, user, res) {
  console.log('Callback');
    request('https://api.fitbit.com/1/user/'+profileId+'/activities/date/2016-01-26.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render('activity', {error: false, body: body});
        }
    })
});

app.listen(8080, function() {
    console.log("✔ Express server listening on port %d in %s mode", 8080, app.get('env'));
});
