import { Module } from '@nestjs/common';
import { BrandsServiceService } from './brands-service/brands-service.service';
import { BrandsController } from './brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandsServiceService],
  controllers: [BrandsController],
})
export class BrandsModule {}
