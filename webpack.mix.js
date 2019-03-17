const mix = require('laravel-mix');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

if (process.env.NODE_ENV === 'production') {
    mix.ts('src/index.ts', 'dist/js')
        .sass('src/styles/index.scss', 'dist/css');
} else {
    mix.ts('src/index.ts', 'build/js')
        .ts('src/demo.tsx', 'build/js')
        .sass('src/styles/index.scss', 'build/css')
        .copy('src/demo.html', 'build/demo.html');
}

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
