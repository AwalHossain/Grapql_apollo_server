const {ApolloServer, gql} = require("apollo-server")
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');

const typeDefs = gql`
 type Query {
    hello: String!
  }
  
  type User {
    id: ID!,
    username: String
  }

  type Error{
    field: String!
  }

  type Error{
    field: String!
    message: String!
  }

  type RegisterResponse{
    errors: [Error]
    user: User
  }

  type Mutation{
    register: RegisterResponse!
  }

`;

const resolvers = {
    Query:{
        hello: ()=> 'hello World come on, I got it, i install nodemo in'
    },
    Mutation:{

      register: ()=> ({
        errors:[{
          field:"usernam",
          message: "bad"
        }],
        user:{
          id: 1,
        }
      
      })
    }
}


const server = new ApolloServer({typeDefs, resolvers,  plugins: [
  ApolloServerPluginLandingPageGraphQLPlayground({
      // options
  }), ApolloServerPluginLandingPageDisabled()
]});

server.listen().then(({url})=> console.log(`Server started at 
${url}`))