import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from './config';
import { typeDefs } from './graphql/schema';
import { createResolvers } from './graphql/resolvers';
import context from './graphql/context';

createConnection(typeOrmConfig).then(() => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: createResolvers(),
    context,
    subscriptions: false,
  });

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
