const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    plugins: argv.mode=="production" ? [new MiniCssExtractPlugin()] : [],
    devServer: {
      publicPath: '/dist/',
      watchContentBase: true
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: argv.mode=="production" ? [
            MiniCssExtractPlugin.loader, 
            'css-loader', 
            {
              loader: 'postcss-loader',
              options: {postcssOptions: {plugins: [["autoprefixer"]]}}
            },
            'sass-loader'
          ] : ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  };
};