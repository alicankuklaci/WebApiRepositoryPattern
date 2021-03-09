 import { Exclude, Expose, Transform } from 'class-transformer';
import {  mongoose } from '@typegoose/typegoose';


export class DocumentCT {
    @Expose()
    // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string
    @Transform((value: any) => {
      if ('value' in value) {
        return value.value instanceof mongoose.Types.ObjectId ? value.value.toHexString() : value.value.toString();
      }
  
      return 'unknown value';
    })
    public _id!: string;
    
    @Expose()
    public __v!: number;
  }