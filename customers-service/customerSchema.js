// customerSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const customerSchema = buildSchema(` 
type Query {
customer(id: Int!): Customer
customers: [Customer]
}
type Mutation {
addCustomer(name: String!, email: String!, phone: Int!): Customer
updateCustomer(id: Int!, name: String!, email: String!, phone: Int!): Customer
deleteCustomer(id: Int!): String
}

type Customer {
id: Int
name: String
email: String
phone: Int
}
`);
module.exports = customerSchema;