//const express = require('express');
import express, {Request,Response} from 'express';
import FlightSearchController from './controllers/FlightSearchController'
import Prefetch from './services/Prefetch'
import FlightBookingConfirmController from './controllers/FlightBookingConfirmController'

//to read environment variables
require('dotenv').config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-control-Allow-Headers', '*');
  //   console.log('its calling btw');
  next();
});

app.use(function(req, res, next){
    res.setTimeout(3000, function(){
        console.log('Request has timed out.');
            res.sendStatus(408);
        });

    next();
});

const port = process.env.PORT || 3001;

app.use('/booking', FlightBookingConfirmController);
app.use('/search', FlightSearchController);

app.get('/prefetch', Prefetch);
app.get('/', (req:Request, res:Response) => {
   //res.status(200).send('welcome to the flight booking app ');
});

//http://localhost:3001/prefetch

app.listen(port, () => {
  console.log('server started and listening on %s', port);
});
