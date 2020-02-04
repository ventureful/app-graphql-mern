import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
})

const app =
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>

ReactDOM.render(app, document.getElementById('root'));

