import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';

import './style/index.scss';

const client = new ApolloClient({
    link: '/graphql',
    cache: new InMemoryCache(),
});

const Main = () => {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
};

const root = createRoot(document.getElementById('root'));

root.render(<Main />);
