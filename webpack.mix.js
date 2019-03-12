const mix = require('laravel-mix');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

mix.ts('src/index.ts', 'build/js')
    .ts('src/demo.tsx', 'demo/')
    .sass('src/styles/index.scss', 'build/css');

/**
 * Webpack Configuration
 * 
 * Add .tsconfig paths plugin
 */
mix.webpackConfig({
    resolve: {
        plugins: [
            new TsconfigPathsPlugin(),
        ],
    },
});
