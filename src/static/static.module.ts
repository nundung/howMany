import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StaticService } from './static.service';
import { StaticContoller } from './static.controller';
import { CacheConfigMoudle } from 'src/common/cache/cache.module';

@Module({
  imports: [HttpModule, CacheConfigMoudle],
  controllers: [StaticContoller],
  providers: [StaticService],
})
export class StaticModule {}
