const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: path.resolve(__dirname, './src/index.tsx'),
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader' // Применяем Babel после TypeScript
            },
            {
              loader: 'ts-loader' // Сначала обрабатываем TypeScript
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'] // Обрабатываем JavaScript только через Babel
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.module\.css$/i,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2)$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new Dotenv()
    ],
    resolve: {
      extensions: [
        '*',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json',
        '.css',
        '.scss',
        '.png',
        '.svg',
        '.jpg',
        '.gif'
      ],
      alias: {
        '@pages': path.resolve(__dirname, './src/pages'),
        '@components': path.resolve(__dirname, './src/components'),
        '@ui': path.resolve(__dirname, './src/components/ui'),
        '@utils-types': path.resolve(__dirname, './src/utils/types')
      }
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
      clean: true
    },
    devServer: {
      static: path.join(__dirname, './dist'),
      compress: true,
      historyApiFallback: true,
      port: 4000
    },
    mode: isProduction ? 'production' : 'development'
  };
};
