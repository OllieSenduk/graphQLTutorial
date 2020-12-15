const { apolloServer, ApolloServer } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')

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


  let idCount = links.length

  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      // 2
      feed: async (parent, args, context) => {
        return context.prisma.link.findMany()
      },
    },
    Mutation: {
        post: (parent, args, context, info) => {
            const newLink = context.prisma.link.create({
              data: {
                url: args.url,
                description: args.description
              }
            })

            return newLink
        }
    }
  }

// Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      prisma
    }
})

server
.listen()
.then(({ url }) =>
console.log(`Server is running on ${url}`)
)