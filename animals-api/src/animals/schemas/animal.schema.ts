import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnimalDocument = HydratedDocument<Animal>;

@Schema()
export class Animal {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  species: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  weight: number;

  @Prop()
  verse: string;


}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
