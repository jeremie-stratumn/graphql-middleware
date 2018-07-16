const { GraphQLServer } = require('graphql-yoga')
const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools')
const { applyMiddleware } = require('graphql-middleware')
const { createApolloFetch } = require('apollo-fetch');

const fetcher = createApolloFetch({ uri: 'http://localhost:4001'});

const createSchema =  async () => {
  const schema = makeRemoteExecutableSchema({
    schema: await introspectSchema(fetcher),
    fetcher,
  });
  return schema
}


const parent = async (resolve, parent, args, ctx, info) => {
  return resolve('foo', 'bar');
}

const parentMiddleware = {
  Query: {
    hello: parent
  },
}

const startServer = async () => {

  const server = new GraphQLServer({
    schema: await createSchema(),
    middlewares: [parentMiddleware]
  })
  
  server.start(() => console.log('Main server is running on http://localhost:4000'))
}

startServer()