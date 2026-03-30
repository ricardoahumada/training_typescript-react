// ============================================================
// webpack.config.js - Lab 3A: Configuracion COMPLETADA
// ============================================================
// Esta configuracion esta COMPLETA y FUNCIONAL para CSR con React.
// Labs 3A -> Listo para usar ( webpack ya configurado )
//
// EVOLUCION:
// - Lab 3A: Webpack CSR (COMPLETADO - esta configuracion)
// - Lab 5A: Next.js SSR (se creara next.config.js)
// - Lab 12A: Vitest (se creara vitest.config.ts)
// - Lab 12B: Playwright (se creara playwright.config.ts)

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ];

  // Bundle analyzer solo cuando se pasa --env analyze
  if (env && env.analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    // Entry point de la aplicacion
    entry: './src/index.tsx',

    // Salida compilada
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[contenthash].js',
      clean: true,
    },

    // Extensiones resueltas
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    // Modulo de reglas
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    // Plugins
    plugins,

    // Servidor de desarrollo
    devServer: {
      static: './dist',
      port: 3000,
      hot: true,
      open: true,
    },

    // Modo de operacion
    mode: 'development',
  };
};
