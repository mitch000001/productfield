var webpack = require('webpack');

module.exports = [
  {
    name: 'browser',
    entry: {
      app: ['webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/index.jsx'
            ],
      illustrator: ['webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/illustrator.jsx'
            ]
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },{
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: '[name].bundle.js'
    },
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
       new webpack.ProvidePlugin({
           $ : "jquery",
           jQuery : "jquery",
           "window.jQuery" : "jquery",
           "root.jQuery" : "jquery"
       }),
      new webpack.HotModuleReplacementPlugin()
    ]
  },
  {
    name: 'server',
    entry: ['./src/illustrator.jsx'],
    target: 'node',
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/server',
      publicPath: '/',
      filename: 'illustrator.generated.js',
      libraryTarget: "commonjs2"
    }
  }
];
