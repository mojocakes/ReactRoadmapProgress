const mix = require('laravel-mix');

mix.ts('src/index.ts', 'build/js')
   .sass('src/styles/index.scss', 'build/css');
