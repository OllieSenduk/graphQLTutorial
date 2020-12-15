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
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
  
  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      // 2
      feed: () => links,
    },
    // 3
    Link: {
      id: (parent) => parent.id,
      description: (parent) => parent.description,
      url: (parent) => parent.url,
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