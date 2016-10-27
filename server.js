var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;;

passport.use(new FitbitStrategy({
        clientID:     FITBIT_CLIENT_ID,
        clientSecret: FITBIT_CLIENT_SECRET,
        callbackURL: "http://yourdormain:3000/auth/fitbit/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));