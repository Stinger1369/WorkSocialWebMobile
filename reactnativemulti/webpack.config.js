const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // Assurez-vous d'avoir installé ce plugin
const webpack = require('webpack');

module.exports = {
  // Point d'entrée de votre application
  entry: path.join(__dirname, 'index.web.js'),

  // Configuration de sortie
  output: {
    path: path.resolve(__dirname, 'build'), // Dossier de sortie pour les fichiers construits
    filename: 'bundle.js', // Nom du fichier JavaScript principal
    publicPath: '/', // Chemin de base pour tous les assets
  },

  // Règles pour le traitement des fichiers
  module: {
    rules: [
      // Règle pour les fichiers JavaScript et JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Règle pour les fichiers CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Règle pour les fichiers d'images
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
    ],
  },

  // Configuration des résolutions de module
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      '@react-navigation/drawer': false,
      'react-native-reanimated': false,
      'react-native-phone-number-input': false,
      'react-native-maps': false,
      '@react-native-community/geolocation': false,
      'react-native-google-places-autocomplete': false,
      'react-native-autocomplete-input': false,
    },
    extensions: ['.web.js', '.js'],
  },

  // Plugins utilisés
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
    new webpack.NormalModuleReplacementPlugin(
      /@react-native-community\/datetimepicker/,
      path.resolve(__dirname, './empty-module.js'),
    ),
    new webpack.NormalModuleReplacementPlugin(
      /react-native-image-picker/,
      path.resolve(__dirname, './empty-module.js'),
    ),
    // Copie le fichier _redirects dans le dossier de build
    new CopyPlugin({
      patterns: [
        {from: 'public/_redirects', to: './'},
      ],
    }),
  ],

  // Configuration du serveur de développement
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
    },
    compress: true,
    port: 8080,
    historyApiFallback: true,
  },
};
