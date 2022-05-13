import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './components/App';

import './styles/index.scss';

const client = new ApolloClient({
    uri: '/graphql',
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
