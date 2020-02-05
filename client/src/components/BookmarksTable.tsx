import React from "react";
import {Divider, Table} from "antd";
import {Bookmark} from "../types";

interface BookmarksProps {
    bookmarks: Bookmark[]
    removeBookmark: Function
}


export const BookmarksTable: React.FC<BookmarksProps> = ({bookmarks, removeBookmark}) => {

    const columns = [
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'id'
        },
        {
            title: 'Action',
            key: 'action',
            render: (bookmark: Bookmark) => (
                <span>
                    <a>Update</a>
                    <Divider type="vertical"/>
                    <a onClick={() => removeBookmark(bookmark.id)}>Delete</a>
                </span>
            ),
        },
        {
            title: 'Open',
            key: 'link',
            render: (bookmark: Bookmark) => (
                <span>
                    <a href={`https://${bookmark.url}`} target="_blank">Open</a>
                </span>
            ),
        },
    ];

    return <Table dataSource={bookmarks} columns={columns} style={{width: '90%'}} rowKey={record => record.id}/>
};
