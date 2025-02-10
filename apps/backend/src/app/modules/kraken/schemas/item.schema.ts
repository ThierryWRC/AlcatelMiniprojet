import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
  @Prop({ unique: true })
  name: string;

  @Prop()
  updated_at: string;

  @Prop([Number])
  prices: number[];

  @Prop()
  rate: number;

  @Prop({ enum: ['product', 'equipment'] })
  category: 'product' | 'equipment';
}

export const ItemSchema = SchemaFactory.createForClass(Item);
