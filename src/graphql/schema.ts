import { gql } from 'apollo-server';

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  enum OrderStatus {
    WAIT_FOR_CONFIRM
    CONFIRMED
    DELIVERING
    DELIVERED
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Product {
    id: ID
    name: String
    category: String
    description: String
    price: Int
    spicy: Boolean
    vegetarian: Boolean
  }
  type Order {
    id: ID
    user: User
    createdAt: String
    status: OrderStatus
    shipment: Shipment
    items: [OrderItem]
  }
  type Shipment {
    id: ID
    address: String
    order: Order
  }
  type OrderItem {
    id: ID
    price: Int
    quantity: Int
    order: Order
    product: Product
  }

  type Query {
    users: [User]
    user(id: ID!): User
    products: [Product]
    productsByCategory(category: String!): [Product]
    product(id: ID!): Product
    orders(userId: ID!): [Order]
    userOrders(userId: ID!): [Order]
    me: User
    categories: [String]
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): LoginResponse!
    createOrder(input: OrderInput!): Order!
  }

  input OrderInputItem {
    productId: ID
    price: Int
    quantity: Int
  }

  input OrderInput {
    userId: ID
    firstName: String
    lastName: String
    address: String
    phone: String
    items: [OrderInputItem]
  }

  type LoginResponse {
    token: String
    user: User
  }
`;

export { typeDefs };
