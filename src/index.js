const {ApolloServer, gql} = require('apollo-server');

// Toda request é POST
// Toda request bate no MESMO endpoint{/graphql}


// Qyery -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID
// atributos por padrão são opcionais, mas podem ser obrigatorios com o simbolo !
const typeDefs = gql`
    type User {
        _id: ID!
        name: String! 
        email: String!
        active: Boolean!
    }

    type Post {
        _id: ID!
        title: String! 
        content: String!
        author: User!
    }

    type Query {
        hello: String
        users: [User!]!
        getUserByEmail(email:String): User!
    }

    type Mutation {
        createUser(name: String!, email:String!): User!
    }
`;

const users = [
    {_id: String(Math.random()), name:'Pedro', email:'pedro@gmail.com', active:true },
    {_id: String(Math.random()), name:'Paulo', email:'paulo@gmail.com', active:true },
    {_id: String(Math.random()), name:'Lucas', email:'lucas@gmail.com', active:false }
];

//  GraphQl faz mapeamento de objeto de 1 para 1 entre os resolvers e os schema do graphQl
const resolvers = {
    Query: {
        hello: () => 'Hello World',
        users: () => users,
        getUserByEmail: (_, args)=> {
            return users.find((user) => user.email === args.email)
        },
    },
    Mutation: {
        createUser:(_,args) =>{
            const newUser = {
                _id: String(Math.random()),
                name: args.name,
                email: args.email,
                active: true
            };
            users.push(newUser);
            return newUser;
        }       

    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({ url}) => console.log(`🔥  Server started at ${url}`));