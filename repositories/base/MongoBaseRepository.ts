import { getModelForClass, prop, types, ReturnModelType, DocumentType } from "@typegoose/typegoose"; // @typegoose/typegoose@7.2.0
import { plainToClass } from "class-transformer";
import * as mongoose from "mongoose"; // mongoose@5.9.18 @types/mongoose@5.7.27
var mongooseDirect = require('mongoose');
export abstract class MongoBaseRepository<T, U extends types.AnyParamConstructor<T> = types.AnyParamConstructor<T>>  {
  protected dataModel: ReturnModelType<U>;
  private T_CLASS: types.AnyParamConstructor<T>;
  constructor(cls: U) {
    this.dataModel = getModelForClass(cls);
    this.T_CLASS = cls;

  }
  public async save(data: any): Promise<T> {
    try {
      let CurrId: any;
      if (data._id)
        CurrId = data._id;
      else {
        CurrId = mongooseDirect.Types.ObjectId();
        data._id = CurrId;
      }
      await this.dataModel.findByIdAndUpdate({ _id: CurrId as any }, data, { upsert: true });
      return plainToClass(this.T_CLASS, data);
    } catch (error) {
      throw new Error(error);

    }
  }
  public async create(data: mongoose.CreateQuery<types.DocumentType<InstanceType<U>>>): Promise<T> {

    try {
      let create = await this.dataModel.create(data);
      return plainToClass(this.T_CLASS, create);
    } catch (error) {
      throw new Error(error);
    }


  }
  public async update(id: any, item: mongoose.UpdateQuery<types.DocumentType<InstanceType<U>>>): Promise<boolean> {

    try {
      await this.dataModel.findByIdAndUpdate(id, item);
      return true;
    } catch (error) {
      throw new Error(error);
    }


  }


  public async findAll(condition: any): Promise<T[]> {

    try {
      let find = await this.dataModel.find(condition);
      return find;
    } catch (error) {
      throw new Error(error);
    }
 

  }



  public async delete(id: any): Promise<boolean> {
    try {
      await this.dataModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      return false;
    }


  }


  public async findByID(Id: any): Promise<T> {

    try {
      let find = await this.dataModel.findById(Id);
      return plainToClass(this.T_CLASS, find); 
    } catch (error) {
      throw new Error(error);
    }
 

  }
  

}