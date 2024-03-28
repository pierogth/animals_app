import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AnimalsModule } from '../src/animals/animals.module';
import { AnimalsService } from '../src/animals/animals.service';
import { INestApplication } from '@nestjs/common';
import { CreateAnimalDto } from '../src/animals/dto/create-animal.dto';

describe('Animals', () => {
  let app: INestApplication;
  let animalsService: AnimalsService;
  let _id : string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, AnimalsModule],
    })
      .overrideProvider(AnimalsService)
      .useValue(animalsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET animals`, () => {
    return request(app.getHttpServer())
      .get('/animals')
      .expect(200);
  });
/* Testing the creation of an animal (store in DB)*/
   it(`/POST animals`, () => {
    const animalDto: CreateAnimalDto = {
      name: 'Ippogrifo',
      type: 'Magic animal',
      species: 'super magic bird',
      age: 4,
      gender: 'Female',
      weight: 122,
      verse: 'aausdhgasdkufhj',
    };

    return request(app.getHttpServer())
      .post('/animals')
      .send(animalDto)
      .expect(201)
      .expect((res) => {
        /* taking track of the _id of the animal just created for future test */
        _id = res.body.data._id;
        expect(res.body.data).toEqual(expect.objectContaining(animalDto));

      });
  }); 

/* Testing to feed of an animal (stored in DB)*/
  it(`/POST animals/{_id}/eat`, () => {
    
    return request(app.getHttpServer())
      .post('/animals/'+_id+'/eat')
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
                  "acknowledged": true,
                  "modifiedCount": 1,
                  "upsertedId": null,
                  "upsertedCount": 0,
                  "matchedCount": 1
              }));

      });
  }); 

  /* Testing to sleep of an animal (stored in DB)*/
  it(`/POST animals/{_id}/sleep`, () => {
    
    return request(app.getHttpServer())
      .post('/animals/'+_id+'/sleep')
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
                  "acknowledged": true,
                  "modifiedCount": 1,
                  "upsertedId": null,
                  "upsertedCount": 0,
                  "matchedCount": 1
              }));

      });
  }); 

 /* Testing to speak of an animal (stored in DB)*/
 it(`/GET animals/{_id}/speak`, () => {
    
  return request(app.getHttpServer())
    .get('/animals/'+_id+'/speak')
    .expect(200)
    .expect((res) => {
      expect(res.text).toEqual("\"The Ippogrifo goes aausdhgasdkufhj\"")
    });
}); 

  afterAll(async () => {
    await app.close();
  });
});