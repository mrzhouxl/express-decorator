var express = require('express');
import {register} from './decorators/Register'
import {UserController} from './controller/UserController'
import { Router } from 'express';
import * as bodyParser from 'body-parser'
var app=express()

register(app,[UserController]);
app.get('/abc', function (req:any, res:any) {
    res.send('Hello World!');
});
var server = app.listen(3122, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})