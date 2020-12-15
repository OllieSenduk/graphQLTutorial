const { apolloServer, ApolloServer } = require('apollo-server')

const fs = require('fs');
const path = require('path');

const typeDefs = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  )

// Schema
// The typeDefs constant defines your GraphQL
// schema (more about this in a bit). Here, it 
// defines a simple Query type with one field 
// called info. This field has the type String!. 
// The exclamation mark in the type definition 
// means that this field is required 
// and can never be null.


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
  
  let idCount = links.length

  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      // 2
      feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            // Add to Database
            links.push(link)
            return link
        }
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