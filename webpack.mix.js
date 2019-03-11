const mix = require('laravel-mix');

mix.ts('src/index.ts', 'build/js')
    .ts('src/demo.tsx', 'demo/');
