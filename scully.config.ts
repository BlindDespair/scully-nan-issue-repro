import {join} from 'path';

import '@scullyio/scully-plugin-puppeteer';

import {
  getSitemapPlugin,
  SitemapConfig,
} from '@gammastream/scully-plugin-sitemap';
import {ScullyConfig, setPluginConfig} from '@scullyio/scully';
import {baseHrefRewrite} from '@scullyio/scully-plugin-base-href-rewrite';
import {
  criticalCSS,
  CriticalCSSSettings,
} from '@scullyio/scully-plugin-critical-css';
import {MinifyHtml} from 'scully-plugin-minify-html';
import {MinifyHtmlOptions} from 'scully-plugin-minify-html/lib';

const sitemapPlugin = getSitemapPlugin();

setPluginConfig<SitemapConfig>(sitemapPlugin, {
  urlPrefix: 'https://example.com',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly',
  priority: [
    '1.0',
    '0.9',
    '0.8',
    '0.7',
    '0.6',
    '0.5',
    '0.4',
    '0.3',
    '0.2',
    '0.1',
    '0.0',
  ],
});

setPluginConfig<CriticalCSSSettings>(criticalCSS, {
  inlineImages: false,
});

setPluginConfig<MinifyHtmlOptions>(MinifyHtml, {
  minifyOptions: {
    minifyJS: false, // minifying inline js screws up scully data.json extraction, see https://github.com/scullyio/scully/issues/1331
  },
});

export const config: ScullyConfig = {
  projectRoot: 'src',
  projectName: 'scully-nan-issue-repro',
  outDir: join('dist', 'static', 'scully-nan-issue-repro'),
  distFolder: join('dist', 'scully-nan-issue-repro'),
  routes: {},
  defaultPostRenderers: [
    baseHrefRewrite,
    'seoHrefOptimise',
    criticalCSS,
    MinifyHtml,
  ],
  puppeteerLaunchOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
};
