const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-registrer', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({email: email});

    if(user){
        return done(null, false, req.flash('registrerMessage', 'the email is al ready taken'));
    }else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }
}));


passport.use('local-login', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({email: email});
    
    if(!user){
        return done(null, false, req.flash('loginMessage', 'no user found.'));
    }
    if(!user.validatePassword(password)){
        return done(null, false, req.flash('loginMessage', 'incorrect password'));
    }

    return done(null, user)

}));