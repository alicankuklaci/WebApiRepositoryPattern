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

      public async TestX():Promise<string>{
        return 'from base';
      }
    
}