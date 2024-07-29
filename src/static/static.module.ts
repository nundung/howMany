import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StaticContoller } from './static.controller';
import { StaticService } from './static.service';
import { CacheMoudle } from 'src/common/cache/cache.module';

@Module({
  imports: [HttpModule, CacheMoudle],
  controllers: [StaticContoller],
  providers: [StaticService],
})
export class StaticModule {}
