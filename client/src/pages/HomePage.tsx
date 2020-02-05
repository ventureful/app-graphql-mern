import React, {useContext} from "react";
import {GET_BOOKMARKS} from "../graphql/queries";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {AuthContext} from "../context/AuthContext";
import {AddBookmarkForm} from "../components/AddBookmarkForm";
import {BookmarksTable} from "../components/BookmarksTable";
import {ADD_BOOKMARK, REMOVE_BOOKMARK} from "../graphql/mutations";


export const HomePage: React.FC = () => {
    const {user} = useContext(AuthContext);

    const {loading, error, data} = useQuery(GET_BOOKMARKS, {variables: {owner: user}});
    const [deleteBookmark] = useMutation(REMOVE_BOOKMARK);
    const [newBookmark] = useMutation(ADD_BOOKMARK);

    if (error) return <p>Error</p>;

    if (loading) return <p>Loading</p>;

    const bookmarks = data.getBookmarks;

    const removeBookmark = async (id: string) => {
        await deleteBookmark({
            variables: {id: id},
            refetchQueries: [{query: GET_BOOKMARKS, variables: {owner: user}}]
        })
    };

    const addBookmark = async (url: string) => {
        await newBookmark({
            variables: {url: url, owner: user},
            refetchQueries: [{query: GET_BOOKMARKS, variables: {owner: user}}]
        })
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%'
        }}>
            <AddBookmarkForm addBookmark={addBookmark}/>
            {bookmarks.length === 0 && <p>Add Bookmark</p>}
            <BookmarksTable bookmarks={bookmarks} removeBookmark={removeBookmark}/>
        </div>
    );
};
