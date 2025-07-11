import { Module } from '@nestjs/common';
import { TypeServiceService } from './type-service/type-service/type-service.service';
import { TypeController } from './type.controller';
import { Type } from './entities/type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TypeServiceService],
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
})
export class TypeModule {}
