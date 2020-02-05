const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull} = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Bookmark = require('../model/Bookmark');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        token: {type: GraphQLString}
    })
});

const BookmarkType = new GraphQLObjectType({
    name: 'Bookmark',
    fields: () => ({
        id: {type: GraphQLID},
        url: {type: GraphQLString},
        owner: {type: GraphQLID}
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, {name, email, password}) {
                try {
                    const candidate = await User.findOne({email});
                    if (candidate) {
                        return new Error('Такой пользователь уже существует')
                    }

                    const hashedPassword = await bcrypt.hash(password, 12);

                    const user = new User({
                        name,
                        email,
                        password: hashedPassword
                    });

                    return await user.save()
                } catch (e) {
                    throw new Error('Что-то пошло не так')
                }
            }
        },
        loginUser: {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, {email, password}) {
                try {
                    const user = await User.findOne({email});

                    if (!user) {
                        return new Error('Пользователя с таким Email не существует')
                    }

                    const isMatch = await bcrypt.compare(password, user.password);

                    if (!isMatch) {
                        return new Error('Не верный пароль')
                    }

                    const token = jwt.sign(
                        {userId: user.id},
                        require('../config/keys').jwtSecret,
                        {expiresIn: '1h'}
                    );

                    return {name: user.name, id: user.id, token}
                } catch (e) {
                    throw new Error('Что-то пошло не так')
                }
            }
        },
        addBookmark: {
            type: BookmarkType,
            args: {
                url: {type: new GraphQLNonNull(GraphQLString)},
                owner: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, {url, owner}) {
                const bookmark = new Bookmark({url, owner})
                return bookmark.save()
            }
        },
        removeBookmark: {
            type: BookmarkType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, {id}) {
                return Bookmark.findByIdAndRemove(id)
            }
        },
        updateBookmark: {
            type: BookmarkType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                url: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, {id, url}) {
                return Bookmark.findByIdAndUpdate(
                    id,
                    {$set: {url}},
                    {new: true}
                )
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getBookmarks: {
            type: GraphQLList(BookmarkType),
            args: {owner: {type: new GraphQLNonNull(GraphQLID)}},
            async resolve(parent, {owner}) {
                try {
                    const bookmarks = await Bookmark.find({owner})

                    if (!bookmarks) {
                        return new Error('У вас нет закладок')
                    }

                    return bookmarks
                } catch (e) {
                    throw new Error('Что-то пошло нет так')
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
