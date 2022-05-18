import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { createContext } from './context'

import { schema } from './schema'

const server = new ApolloServer({
  schema,
  context: createContext,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

const port = process.env.PORT || 4000

server.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))