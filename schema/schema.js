const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull} = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

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
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getUsers: {
            type: UserType
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
