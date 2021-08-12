/* eslint-disable prettier/prettier */
import { Pizza } from './pizza.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza])],
  controllers: [PizzaController],
  providers: [PizzaService],
  exports: [TypeOrmModule]
})
export class PizzaModule {}
