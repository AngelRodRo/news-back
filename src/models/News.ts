import {Property, Format, Default} from "@tsed/schema";
import {Model, ObjectID, Schema, MongooseIndex} from "@tsed/mongoose";

@Schema()
export class Image {
  @Property()
  url: string;

  @Property()
  thumbnail: string;
}

@Model({ name: "news" })
@MongooseIndex({ title: 'text', body: 'text' })
export class NewsModel {
  @ObjectID("id")
  _id?: string;

  @Property()
  title: string;

  @Property()
  body: string;

  @Property()
  description: string;

  @Property()
  image: Image;

  @Property()
  url: string;

  @Format("date-time")
  @Default(Date.now)
  createdAt?: Date;
}