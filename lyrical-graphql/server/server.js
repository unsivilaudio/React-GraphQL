const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { webpack } = require('webpack');
const { graphqlHTTP } = require('express-graphql');
const webpackConfig = require('../webpack.config.js');
const models = require('./models');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/lyrical-graphql';
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
});
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(express.json());
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

try {
    var compiler = webpack(webpackConfig);

    app.use(require('connect-history-api-fallback')());
    app.use(
        require('webpack-dev-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath,
        })
    );

    app.use(
        require('@gatsbyjs/webpack-hot-middleware')(compiler, {
            log: false,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000,
        })
    );
} catch (err) {
    console.log(err.message);
}

module.exports = app;
