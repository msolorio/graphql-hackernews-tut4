const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');


const resolvers = {
  Query,
  Mutation,
  Link,
  User
}

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
);

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: (
        req && req.headers.authorization
        ? getUserId(req)
        : null
      )
    }
  }
});


server
  .listen()
  .then((res) => {
    console.log(`Server is running on PORT: ${res.url}`);
  });
