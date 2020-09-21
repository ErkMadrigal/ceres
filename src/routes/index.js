const express = require("express");
const router = express.Router();
const email = require('./email');
const passport = require('passport');

const oEmail = new email({
    'host':'smtp.ethereal.email',
    'port': 587,
    'secure': false,
    auth:{
        user: 'quinten.mann@ethereal.email',
        pass: 'a3r2vF8v4VqpGtq3jQ'
    }
});


// const database = require('../models/database');

router.get("/", (req, res) => {
  res.render("index.html", { title: "inicio" });
});

router.get("/gallery", (req, res) => {
  res.render("gallery.html", { title: "gallery" });
});

router.post("/email", (req, res) => {

    const data = req.body;
    console.log(data)

    let email ={
        from: data.email,
        to:"quinten.mann@ethereal.email",
        subject: data.name,
        html: data.message
    }
    oEmail.enviarCorreo(email);
    res.redirect("/#contact")
});


router.get("/registrer", (req, res) => {
  res.render("registrer.html");
});


router.post("/registrer", passport.authenticate('local-registrer', {
  successRedirect: '/login',
  failureRedirect: '/registrer',
  passReqToCallback: true
}));


router.get("/login", (req, res, next) => {
  res.render("login.html");
});

router.post("/login", passport.authenticate('local-login', {
  successRedirect: '/update',
  failureRedirect: '/login',
  passReqToCallback: true
}));


router.get("/update", isAuthenticated, (req, res, next) => {
  res.render("update.html", { title: "update" });
});


router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated (req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}

module.exports = router;
