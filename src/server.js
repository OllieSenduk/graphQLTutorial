const { apolloServer, ApolloServer, PubSub } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const pubsub = new PubSub()
const prisma = new PrismaClient()
const { getUserId } = require('./utils');

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


  const resolvers = {
    Query,
    Mutation,
    User,
    Link
  }

// Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ( {req} ) => {
      return {
        ...req,
        prisma,
        userId: 
          req && req.headers.authorization ? getUserId(req) : null
      }
    }
})

server
.listen()
.then(({ url }) =>
console.log(`Server is running on ${url}`)
)