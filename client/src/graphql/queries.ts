import {gql} from "apollo-boost"

export const GET_BOOKMARKS = gql`
    query ($owner: ID!) {
      getBookmarks (owner: $owner) {
        id
        url
      }
    }
`;
