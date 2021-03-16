const {ApolloServer, gql} = require('apollo-server');

// Toda request é POST
// Toda request bate no MESMO endpoint{/graphql}


// Qyery -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID
const typeDefs = gql`
    type Query {
        hello: String
    }
`;
//  GraphQl faz mapeamento de objeto de 1 para 1 entre os resolvers e os schema do graphQl
const resolvers = {
    Query: {
        hello: ()=> 'Hello World'
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({ url}) => console.log(`🔥  Server started at ${url}`));