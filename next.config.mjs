await import('./src/env.mjs');

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ['zh-CN'],
    defaultLocale: 'zh-CN',
  },
};
export default config;
