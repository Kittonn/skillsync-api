import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: async (configService: ConfigService): Promise<Redis> => {
    return new Redis(configService.get('redis.uri'), {
      tls: {
        rejectUnauthorized: false,
      },
    });
  },
  inject: [ConfigService],
};
