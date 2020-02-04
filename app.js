const app = require('express')()
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')

const uri = require('./config/keys').mongoUri
const PORT = require('./config/keys').port

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: error => ({message: error.message})
}))

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
