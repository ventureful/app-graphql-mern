import {gql} from "apollo-boost";

export const LOGIN_USER = gql`
    mutation loginUser ($email: String!, $password: String!) {
      loginUser (email: $email, password: $password) {
        id
        name
        token
      }
    }
`;

export const REGISTER_USER = gql`
    mutation registerUser ($name: String!, $email: String!, $password: String!) {
      registerUser (name: $name, email: $email, password: $password) {
        name
        email
        password
      }
    }
`;

export const UPDATE_BOOKMARK = gql`
    mutation updateBookmark ($id:ID!, $url:String!){
      updateBookmark (id: $id, url: $url){
        url
      }
    }
`;

export const ADD_BOOKMARK = gql`
    mutation addBookmark ($url: String!, $owner: ID!) {
      addBookmark   (url: $url, owner: $owner) {
        url
        owner
      }
    }
`;

export const REMOVE_BOOKMARK = gql`
    mutation removeBookmark ($id: ID!){
      removeBookmark (id: $id){
        id
      }
    }
`;
