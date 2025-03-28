import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes';

class App{
    constructor(){
        this.server = express();
            
        mongoose.connect('mongodb://admin:admin@localhost:27017/')
            .then(() => console.log('database connected'))
            .catch(error => console.log(error));

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(
            '/files', express.static(path.resolve(__dirname, '../thumbnails'))
        );


        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;