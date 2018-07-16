const { GraphQLServer } = require('graphql-yoga')

// Schema

const typeDefs = `
  type Query {
    hello: String!
    world: String!
  }
`

const resolvers = {
  Query: {
    hello: (parent, arg) => {
      console.log('in hello query, parent = ', parent);
      return 'Parent is ' + parent + ', arg is ' + JSON.stringify(arg);
    },
    world: (parent, arg) => {
      console.log('in world query, parent = ', parent);
      return 'Parent is ' + parent + ', arg is ' + JSON.stringify(arg);
    }
  },
}

// Middleware
const parent = async (resolve, parent, args, ctx, info) => {
  return resolve('foo', 'bar');
}

const parentMiddleware = {
  Query: {
    world: parent
  },
}

// Server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [parentMiddleware]
})

server.start({port: 4001},() => console.log('Remote server is running on http://localhost:4001'))
