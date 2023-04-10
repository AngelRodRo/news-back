import { PlatformTest } from '@tsed/common';
import { MongooseService } from '@tsed/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { NewsModel } from '../src/models/News'; 
import { KeysModel } from '../src/models/Keys';

const news: NewsModel[] = [];

for (let i = 0; i < 50; i++) {
  news.push({
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(),
    description: faker.lorem.paragraphs(),
    image: {
      url: faker.image.imageUrl(),
      thumbnail: faker.image.lorempicsum.imageUrl(),
    },
    url: faker.internet.url(),
  });
}

async function populateDb() {
  try {
    console.log('Populating DB...')
    await PlatformTest.create(); 

    const mongooseService = PlatformTest.get<MongooseService>(MongooseService);
    const connection = await mongooseService.connect("default", String(process.env.DB_DEFAULT_URL), { });
    
    const newsModel: Model<NewsModel> = connection.model('news', { 
      title: String, 
      body: String, 
      description: String, 
      image: { url: String, thumbnail: String }, 
      url: String 
    });

    const keysModel: Model<KeysModel> = connection.model('keys', {
      key: String,
      host: String,
      type: String
    });

    console.log('Inserting keys...');
    await keysModel.create({
      key: process.env.X_RAPIDAPI_KEY,
      host: process.env.X_RAPIDAPI_HOST,
      type: 'RAPIDAPI'
    });

    console.log('Deleting previous news...')
    await newsModel.deleteMany({});

    console.log('Inserting news...')
    await newsModel.insertMany(news);

    console.log('Closing connections...')
    await mongooseService.closeConnections();
  }
  catch (err) {
    console.error(err);
  }
}

populateDb();

export { populateDb };
