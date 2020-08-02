const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html', {title: 'Showkes'});
});

router.get('/add-resource', (req, res) => {
    res.render('add-resource.html', {title: 'add-resource | page'})
});

router.get('/resources', (req, res) => {
    res.render('resources.html', {title: 'resources | page'})
});

module.exports = router;