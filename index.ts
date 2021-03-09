
import "reflect-metadata";
import * as bodyParser from 'body-parser';

import { Container } from 'inversify';
import { interfaces, InversifyExpressServer } from 'inversify-express-utils';

// declare metadata by @controller annotation

import mongoose from 'mongoose';


//import { CatService } from './repositories/services/CatService';
// declare metadata by @controller annotation
//import "./repositories/controller/foo.controller";

import "./repositories/controller/index";
import * as services from "./repositories/services/index";


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
.connect("mongodb://xapp_warriors:254226Aq%2a%2a@mongo-worker1.mobilex360.io:27017,mongo-worker2.mobilex360.io:27017,mongo-worker3.mobilex360.io:27017/warriors?authSource=admin&replicaSet=power-rs&readPreference=primary&appname=XAPP_ERP&ssl=true", MONGO_OPTIONS);


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

