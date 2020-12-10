const { apolloServer, ApolloServer } = require('apollo-server')

// Schema
// The typeDefs constant defines your GraphQL
// schema (more about this in a bit). Here, it 
// defines a simple Query type with one field 
// called info. This field has the type String!. 
// The exclamation mark in the type definition 
// means that this field is required 
// and can never be null.
const typeDefs = `
    type Query {
        info: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        info: () => "Not null"
    }
}

// Server
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server
.listen()
.then(({ url }) =>
console.log(`Server is running on ${url}`)
)