import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { Animal } from './schemas/animal.schema';
import { ApiResponse, ApiOkResponse, getSchemaPath, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new animal',
    schema: {
      allOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(CreateAnimalDto) },
            },
          },
        },
      ],
    },
  })  async create(@Body() createAnimalDto: CreateAnimalDto) {
    return {data : await this.animalsService.create(createAnimalDto)};
  }

  @Get()
  @ApiOkResponse({
    description:"get all animals stored in mongo DB",
    schema: {
      example: // write the response you want here
      [    
        {
          "_id": "65e36d53f88196e60e88e7c7",
          "name": "Gufo",
          "type": "Rapaceasd",
          "species": "Rap",
          "age": 23,
          "gender": "Male",
          "weight": 21,
          "verse": "OHWL",
          "__v": 0
      },
      {
          "_id": "65e4243b6cec6feaf2f51d91",
          "name": "Beetle",
          "type": "Insect",
          "species": "Insect",
          "age": 14,
          "gender": "Male",
          "weight": 7,
          "verse": "Buzz!",
          "__v": 0
      },
      {
          "_id": "65e45b46da002a695eb8fcb0",
          "name": "Lion",
          "type": "Predator",
          "species": "Mammifer",
          "age": 10,
          "gender": "Male",
          "weight": 74,
          "verse": "ROOHAAARRRR!",
          "__v": 0
      },
      {
          "_id": "65e45b4bda002a695eb8fcb9",
          "name": "Tiger",
          "type": "Predator",
          "species": "Felin",
          "age": 13,
          "gender": "Male",
          "weight": 7,
          "verse": "ROOOAAAHHHHRRRRR!",
          "__v": 0
      }
      ],
    },
  })
  async findAll(): Promise<Animal[]> {
    return this.animalsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get a specific animal.',
                    schema: {
                      example: // write the response you want here
                      {
                        "_id": "65e36d53f88196e60e88e7c7",
                        "name": "Gufo",
                        "type": "Rapaceasd",
                        "species": "Rap",
                        "age": 23,
                        "gender": "Male",
                        "weight": 21,
                        "verse": "OHWL",
                        "__v": 0
                    },
                    },  
                  })
  async findOne(@Param('id') id: string): Promise<Animal> {
    return this.animalsService.findOne(id);
  }

  @Get(':id/speak')
  @ApiOkResponse({ 
    description: 'Speak the verse of specific animal',
    schema: {
      example: 
      [    
        "The gufo goes OHWL"
      ],
    }, })
  async speakOne(@Param('id') id: string): Promise<Animal> {
    return this.animalsService.speakOne(id);
  }

   @Get('delete/all')
   @ApiOkResponse({ description: 'Delete all animals',
   schema: {
    example: 
    [    
      {
        "acknowledged": true,
        "deletedCount": 3
    }
    ],
  }, })
  async deleteAll(): Promise<any> {
    return this.animalsService.deleteAll();
  }

  @Post(':id/eat')
  @ApiCreatedResponse({ description: 'Feed a specific animal',
  schema: {
    example: 
    [    
      {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
    ],
  }, })
  async eatOne(@Param('id') id: string): Promise<Animal> {
    return await this.animalsService.eatOne(id);
  }

  @Post(':id/sleep')
  @ApiCreatedResponse({description: 'Sleep a specific animal',
  schema: {
    example: 
    [    
      {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
    ],
  }, })
  async sleepOne(@Param('id') id: string): Promise<Animal> {
    return await this.animalsService.sleepOne(id);
  }

  @Post(':id')
  @ApiCreatedResponse({ description: 'Update a specific animal',
  schema: {
    example: 
    [    
      {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
    ],
  }, })
  async updateOne(@Param('id') id: string, @Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
    return await this.animalsService.updateOne(id, createAnimalDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete a specific animal',
  schema: {
    example: 
    [    
      {
        "acknowledged": true,
        "deletedCount": 1
    }
    ],
  }, })
  async delete(@Param('id') id: string) {
    return this.animalsService.delete(id);
  } 
}
