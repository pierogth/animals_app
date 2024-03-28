import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AnimalsService } from './animals.service';
import { Animal } from './schemas/animal.schema';

const mockAnimal = {
  name: 'Ippogrifo',
                type: 'Magic animal',
                  species: 'super magic bird',
                  age: 4,
                  gender: 'Female',
                  weight: 122,
                  verse: 'aausdhgasdkufhj',
};

describe('AnimalsService', () => {
  let service: AnimalsService;
  let model: Model<Animal>;

  const animalsArray = [
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
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsService,
        {
          provide: getModelToken('Animal'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockAnimal),
            constructor: jest.fn().mockResolvedValue(mockAnimal),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
    model = module.get<Model<Animal>>(getModelToken('Animal'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all animals', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(animalsArray),
    } as any);
    const cats = await service.findAll();
    expect(cats).toEqual(animalsArray);
  });

  it('should insert a new animal', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Ippogrifo',
                  type: 'Magic animal',
                  species: 'super magic bird',
                  age: 4,
                  gender: 'Female',
                  weight: 122,
                  verse: 'aausdhgasdkufhj',
      } as any),
    );
    const newCat = await service.create({
      
                 name: 'Ippogrifo',
                  type: 'Magic animal',
                  species: 'super magic bird',
                  age: 4,
                  gender: 'Female',
                  weight: 122,
                  verse: 'aausdhgasdkufhj',
              
    });
    expect(newCat).toEqual(mockAnimal);
  });
});
