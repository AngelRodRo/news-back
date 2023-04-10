import {Property} from "@tsed/schema";
import {Model, ObjectID, MongooseIndex} from "@tsed/mongoose";

@Model({ name: "keys" })
export class KeysModel {
  @ObjectID("id")
  _id?: string;

  @Property()
  key: string;

  @Property()
  host: string;

  @Property()
  type: string;
}