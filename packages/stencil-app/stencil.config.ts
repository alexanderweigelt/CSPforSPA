import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  buildEs5: 'prod',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
};
