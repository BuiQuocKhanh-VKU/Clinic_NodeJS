import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();//load .env file

let app = express();
// app.use(cors({origin: true})); // cho phep tat ca cac domain deu co the truy cap vao

//App headers
app.use(function (req, res, next) {

    //wedsite you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    //Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Set to true if you need the website to include cookies in the requests sent
    //to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    //Pass to next layer of middleware
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8180;

app.listen(port, () => {
    console.log("Backend Nodejs is running on port", port);
})
