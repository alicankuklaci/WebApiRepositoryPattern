import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import { MongoBaseRepository } from "../base/MongoBaseRepository";
import { Cat } from "../models/Cat"
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { CatService } from "./CatService";
// now, we have all code implementation from BaseRepository
@injectable()
export class Z_CatService extends CatService{


    //some of test.
    public async Test(){
      let abc= await  super.findByID('604670d96f92fe8559a196e5');
      let a=1;
    }

    public async TestX():Promise<string>{
      return 'from sub class';
    }

}