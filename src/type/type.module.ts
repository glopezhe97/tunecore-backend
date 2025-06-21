import { Module } from '@nestjs/common';
import { TypeServiceService } from './type-service/type-service/type-service.service';

@Module({
  providers: [TypeServiceService]
})
export class TypeModule {}
