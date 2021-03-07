"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var Register_1 = require("./decorators/Register");
var UserController_1 = require("./controller/UserController");
var app = express();
Register_1.register(app, [UserController_1.UserController]);
app.get('/abc', function (req, res) {
    res.send('Hello World!');
});
var server = app.listen(3122, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
