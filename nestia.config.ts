import { INestiaConfig } from '@nestia/sdk';

const config: INestiaConfig = {
  input: 'src/**/infra/web/*.controller.ts',
  swagger: {
    output: 'openapi.json',
  },
};

export default config;
