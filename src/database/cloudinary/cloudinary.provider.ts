import { Provider } from '@nestjs/common';
import { v2, ConfigOptions } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  useFactory: async (configService: ConfigService): Promise<ConfigOptions> => {
    return v2.config({
      cloud_name: configService.get('cloudinary.cloudName'),
      api_key: configService.get('cloudinary.apiKey'),
      api_secret: configService.get('cloudinary.apiSecret'),
    });
  },
  inject: [ConfigService],
};
