
import "reflect-metadata";
import * as bodyParser from 'body-parser';

import { Container } from 'inversify';
import { interfaces, InversifyExpressServer } from 'inversify-express-utils';



import mongoose from 'mongoose';



import "./repositories/controller/index";
import * as services from "./repositories/services/index";

import AppSettings=require('./setting.json');

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false,
    useCreateIndex:true,
    useFindAndModify:false,
};

(async () => {
// set up container
let container = new Container();

// set up bindings
//container.bind<services.CatService>('CatService').to(services.CatService);
container.bind<services.Z_CatService>('CatService').to(services.Z_CatService);
container.options.skipBaseClassChecks=true;



await  mongoose
.connect(AppSettings.MongoConnectionString, MONGO_OPTIONS);


// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);

})();

