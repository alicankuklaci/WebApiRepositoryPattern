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
  