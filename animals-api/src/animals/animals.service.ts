import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { Animal } from './schemas/animal.schema';

@Injectable()
export class AnimalsService {
  constructor(@InjectModel(Animal.name) private readonly animalModel: Model<Animal>) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const createdAnimal = await this.animalModel.create(createAnimalDto);
    return createdAnimal;
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.animalModel.findOne({ _id: id }).exec();
  }

  async speakOne(id: string): Promise<any> {
    let myAnimal = await this.animalModel.findOne({ _id: id }).exec();
    if (myAnimal)
      return JSON.stringify("The "+myAnimal.name+" goes "+myAnimal.verse);
    else return 404;
  }

  async eatOne(id: string): Promise<any> {
    let myAnimal = await this.animalModel.findOne({ _id: id }).exec();
    if (myAnimal)
      return this.animalModel.updateOne({ _id: id }, {weight: myAnimal.weight+1} ).exec();
    else return 404;
  }

  async sleepOne(id: string): Promise<any> {
    let myAnimal = await this.animalModel.findOne({ _id: id }).exec();
    if (myAnimal)
      return this.animalModel.updateOne({ _id: id }, {age: myAnimal.age+1} ).exec();
    else return 404;
  }

  async updateOne(id: string, createAnimalDto: CreateAnimalDto): Promise<any> {
    let res = await this.animalModel.updateOne({ _id: id }, createAnimalDto ).exec();
    console.log(res)
    return res;
  }

  async delete(id: string) {
    const deletedAnimal = await this.animalModel
      .deleteOne({ _id: id })
      .exec();
    return deletedAnimal;
  } 

  async deleteAll() {
    const deletedAnimals = await this.animalModel
      .deleteMany({age: { $gte: 0 }})
      .exec();
    return deletedAnimals;
  } 
}
