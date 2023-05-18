// orderSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const orderSchema = buildSchema(` 
type Query {
order(id: Int!): Order
orders: [Order]
}
type Mutation {
addOrder(customerId: Int!, bookId: Int!, quantity: Int!, totalAmount: Float!): Order
updateOrder(id: Int!, customerId: Int!, bookId: Int!, quantity: Int!, totalAmount: Float!): Order
deleteOrder(id: Int!): String
}

type Order {
id: Int
customerId: Int
bookId: Int
quantity: Int
totalAmount: Float

}
`);
module.exports = orderSchema;