const express = require("express");
const router = express.Router();
const email = require('./email');

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
  res.render("index.html", { title: "viciones" });
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

module.exports = router;
