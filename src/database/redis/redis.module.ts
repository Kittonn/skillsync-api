import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisProvider } from './redis.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [RedisProvider,RedisService],
  exports: [RedisService],
})
export class RedisModule {}
