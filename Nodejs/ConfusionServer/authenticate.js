var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); 
var FacebookTokenStrategy = require('passport-facebook-token');

var config = require('./config');
const { use } = require('passport');
const user = require('./models/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600
        });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,(jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, config.secretKey, function(err, decoded){
            if(err){
                var err = new Error('You are not authenticated');
                err.status = 401;
                return next(err);
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        var err = new Error('No token Provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req, res, next){
    if(req.user.admin){
        next();
    }
    else{
        var err = new Error ('you are not Authorized to perform this operation! ');
        err.status = 403;
        return next(err);
    }
};

exports.facebookPassport = passport.use(new FacebookTokenStrategy ({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        user.findOne({facebookId: profile.id}, (err, user) => {
            if(err){
                return done(err, false);
             }
             if(!err & user !== null){
                 return done(null, user);
             }
             else {
                 user = new User({ username: profile.displayName});
                 user.facebookId = profile.id;
                 user.firstname = profile.name.givenName;
                 user.lastname = profile.name.familyName;
                 user.save((err, user) => {
                     if(err)
                        return done(err, false);
                    else 
                        return done(null, user);
                 })
             }
        });
    }
));


