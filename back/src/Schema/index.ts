import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { GET_ALL_USERS, GET_USER_BY_ID } from './Queries/User';
import { CREATE_USER, DELETE_USER } from './Mutation/User';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllUsers: GET_ALL_USERS,
    getUserById: GET_USER_BY_ID,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
