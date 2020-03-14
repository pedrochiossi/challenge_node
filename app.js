require('dotenv').config();
import express from 'express';
import { connect } from 'mongoose';
import { json, urlencoded } from 'body-parser';
import logger from 'morgan';
import apiRoutes from './routes/api.routes';


// mongodb database connection
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((x) => {
        console.log(`Connected to mongo, database name: ${x.connections[0].name} `);

    })
    .catch(err => console.log('Error connecting to mongo', err));


class App{
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(logger('dev'));
        this.server.use(json());
        this.server.use(urlencoded({extended: false}));
    }

    routes() {
        this.server.use('/api/v1', apiRoutes);
    }
} 
export default new App().server;


