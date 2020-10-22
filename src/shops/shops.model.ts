import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopDocument = Shop & Document;

@Schema()
export class Shop {
  @Prop({ required: true })
  name: string;

  @Prop()
  location:{
    latitude: {
      type: number;
      required: true;
    };
    longitude: {
      type: number;
      required: true;
    };
  };

  @Prop({ required: true })
  imageUrl: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
