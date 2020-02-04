const express = require('express')
const cors = require('cors')
const path = require('path')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')

const uri = require('./config/keys').mongoUri
const PORT = process.env.PORT || require('./config/keys').port

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: error => ({message: error.message})
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

async function start() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`App started, ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}


start()
