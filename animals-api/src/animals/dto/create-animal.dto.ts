import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
  @ApiProperty({ example: 'Lion', description: 'The name of the animal' })
  readonly name: string;
  @ApiProperty({ example: 'Predator', description: 'The type of the animal' })
  readonly type: string;
  @ApiProperty({ example: 'Felin', description: 'The specie of the animal' })
  readonly species: string;
  @ApiProperty({ example: '25', description: 'The age of the animal' })
  readonly age: number;
  @ApiProperty({ example: 'm', description: 'The gender of the animal' })
  readonly gender: string;
  @ApiProperty({ example: '23', description: 'The weight of the animal' })
  readonly weight: number;
  @ApiProperty({ example: 'RHOAAARHRH', description: 'The verse of the animal' })
  readonly verse: string;
}
