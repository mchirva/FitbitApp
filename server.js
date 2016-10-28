var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
var passport = require('passport');
var express = require('express');

var app = express();

var FITBIT_CLIENT_ID = "227WYF";
var FITBIT_CLIENT_SECRET = "28e96c62a095734ac15d667c085ce2dc";

var router = express.Router();

passport.use(new FitbitStrategy({
        clientID:     FITBIT_CLIENT_ID,
        clientSecret: FITBIT_CLIENT_SECRET,
        callbackURL: "http://52.89.68.106:8080/auth/fitbit/callback"
    },
    function(req, accessToken, refreshToken, profile, done) {
        return done(req, user);
    }
));

app.get('/auth/fitbit',
    passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile'] }
    ));

app.get( '/auth/fitbit/callback', function(req, user, res) {
    console.log('####',req);
    // res.redirect('/app.html');
});

app.listen(8080, function() {
    console.log("✔ Express server listening on port %d in %s mode", 8080, app.get('env'));
});
