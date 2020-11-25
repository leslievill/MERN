require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// Yelp fusion setup
const yelp = require('yelp-fusion');
const apikey = process.env.apikey;
const client = yelp.client(apikey);

//Yelp API call to get restaurant results
router.post('/results', function (req, res, callback) {
    // console.log(req.headers)
    const searchRequest = {
        location: req.body.location, //search location from front end
        limit: 12
    }
    client.search(searchRequest).then(response => {
        console.log(response)
        const result = response.jsonBody;
        const prettyJson = JSON.stringify(result, null, 4);
        res.send(prettyJson);
    }).catch((err) => {
        console.log("error:", err);
    });
    console.log(searchRequest)
    console.log(client)
});

// POST - save restaurant to db for user profile
router.post('/results/restaurantsaved', function (req, res, callback) {
    var userId = req.body.user.id;
    User.findById(userId)
        .exec(function (err, foundUser) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                foundUser.restaurant.push({
                    "name": req.body.business.name,
                    "url": req.body.business.url,
                    "imgurl": req.body.business.image_url,
                    "rating": req.body.business.rating,
                    "category": req.body.business.categories[0].title
                });
                foundUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
                res.json(foundUser);
            }
        });
});

// GET user profile with saved restaurants
router.get('/profile/:id', function (req, res, callback) {
    User.findById(req.params.id)
        .exec(function (err, user) {
            if (err) { return console.log('error', err); }
            res.send(user);
        });
});

// POST packing list item to user db
router.post('/profile/list/:userId', function (req, res, callback) {
    var { userId } = req.params;
    var items = req.body.list;
    User.findById(userId)
        .exec(function (err, foundUser) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else { //TODO check for duplicates!
                foundUser.list = items && items.length ? items : [];
                foundUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
                res.json(foundUser);
            }
        });
});

// DELETE packing list item from user db
router.delete('/profile/list/:userId', function (req, res, next) {
    const { userId } = req.params;
    User.findById(userId, function (err, user) {
        User.update({ _id: userId }, {
            $set: {
                "list": req.body.list
            }
        }, function (err, user) {
            if (err) console.log("error", err);
            res.json(user);
        });
    });
});


module.exports = router;