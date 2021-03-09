# WebApiRepositoryPattern
Repository pattern &amp; Express Web api all together with SOLID standard.

if you want to add a service, you can follow these three steps.
 * Create a model
 * Create a service
 * Create a controller

## Create a model

```javascript
import { Exclude, Expose, Transform } from 'class-transformer';
import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';
import { DocumentCT } from "./DocumentCT";
import { injectable } from 'inversify';


@Exclude()
@injectable()
 export class Cat extends DocumentCT{  
 
    @prop()
    @Expose()
    public Age?: number;
  
    @prop()
    @Expose()
    public Color?: string;
  }
  
```


## Create a service

```javascript

import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import { MongoBaseRepository } from "../base/MongoBaseRepository";
import { Cat } from "../models/Cat"
import { injectable, inject } from "inversify";
import "reflect-metadata";
// now, we have all code implementation from BaseRepository
@injectable()
export class CatService extends MongoBaseRepository<Cat,AnyParamConstructor<Cat>>{

    constructor() {
        super(Cat);
        
      }

     
    
}
  
```


## Create a controller

```javascript
import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Cat } from "../models/Cat";
import "reflect-metadata";
import { CatService } from "../services";

@controller("/cat")
export class CatController implements interfaces.Controller {

    constructor( @inject("CatService") private fooService: CatService ) {}

    @httpGet("/")
    private async index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Cat> {
       
        return await this.fooService.findByID('604670d96f92fe8559a196e5')
    }

 
    @httpPost("/")
    private async create(@request() req: express.Request, @response() res: express.Response) {
        try {
            await this.fooService.create(req.body);
            res.sendStatus(201);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

  
}
  
```


