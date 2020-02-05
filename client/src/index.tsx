import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import './index.css';
import 'antd/dist/antd.min.css'

const client = new ApolloClient({
    uri: '/graphql'
})

const app =
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>

ReactDOM.render(app, document.getElementById('root'));

