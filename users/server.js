const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: {
            defaultQuery: '# ENTER SOME QUERY TO GET STARTED',
            editorTheme: 'material',
        },
    })
);

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
