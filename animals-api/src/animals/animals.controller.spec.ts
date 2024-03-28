import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsController } from './animals.controller';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalsService } from './animals.service';

describe('Animals Controller', () => {
  let controller: AnimalsController;
  let service: AnimalsService;
  const createAnimalDto: CreateAnimalDto = {
    name: 'Ippogrifo',
    type: 'Magic animal',
    species: 'super magic bird',
    age: 4,
    gender: 'Female',
    weight: 122,
    verse: 'aausdhgasdkufhj',
  };

  const mockAnimal = {
    name: 'Ippogrifo',
    type: 'Magic animal',
    species: 'super magic bird',
    age: 4,
    gender: 'Female',
    weight: 122,
    verse: 'aausdhgasdkufhj',
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalsController],
      providers: [
        {
          provide: AnimalsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                 name: 'Ippogrifo',
                  type: 'Magic animal',
                  species: 'super magic bird',
                  age: 4,
                  gender: 'Female',
                  weight: 122,
                  verse: 'aausdhgasdkufhj',
              },
              {
                name: 'Cat #2',
               type: 'Magic animal',
                  species: 'super magic bird',
                  age: 4,
                  gender: 'Female',
                  weight: 122,
                  verse: 'aausdhgasdkufhj',
              },
              {
                name: 'Cat #3',
                type: 'Magic animal',
                  species: 'super magic bird',
                  age: 4,
                  gender: 'Female',
                  weight: 122,
                  verse: 'aausdhgasdkufhj',
              },
            ]),
            create: jest.fn().mockResolvedValue(createAnimalDto),
          },
        },
      ],
    }).compile();

    controller = module.get<AnimalsController>(AnimalsController);
    service = module.get<AnimalsService>(AnimalsService);
  });

  describe('create()', () => {
    it('should create a new animal', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockAnimal);

      await controller.create(createAnimalDto);
      expect(createSpy).toHaveBeenCalledWith(createAnimalDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of animals', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
                 name: 'Ippogrifo',
                  type: 'Magic animal',
                  species: 'super magic bird',
                  age: 4,
                  gender: 'Female',
                  weight: 122,
                  verse: 'aausdhgasdkufhj',
              },
              {
                name: 'Cat #2',
               type: 'Magic animal',
                  species: 'super magic bird',
                  age: 4,
                  gender: 'Female',
                  weight: 122,
                  verse: 'aausdhgasdkufhj',
              },
              {
                name: 'Cat #3',
                type: 'Magic animal',
                  species: 'super magic bird',
                  age: 4,
                  gender: 'Female',
                  weight: 122,
                  verse: 'aausdhgasdkufhj',
              },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
