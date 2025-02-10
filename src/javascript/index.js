const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { Client, GatewayIntentBits, Options, Collection, Events } = require('discord.js');

dotenv.config();

const app = express();
const port = 3000;

const mongoose = require('mongoose');
const { login } = require('./Auth/login');
const { client } = require('./bot');

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected.');
});
          
mongoose.connection.on('err', (err) => {
    console.error(`MongoDB connection error: \n ${err.stack}`);
});
          
mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected.');
});

login(axios, app, port, dotenv)
client(Client, GatewayIntentBits, Options, Collection, Events)