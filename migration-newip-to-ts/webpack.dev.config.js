const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    // devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
    },
};
