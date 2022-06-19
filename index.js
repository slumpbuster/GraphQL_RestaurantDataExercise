var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var express = require("express");

// Construct a schema, using GraphQL schema language
var restaurants = [
  {
    id: 1,
    name: "WoodsHill ",
    description:
      "American cuisine, farm to table, with fresh produce every day",
    dishes: [
      {
        name: "Swordfish grill",
        price: 27,
      },
      {
        name: "Roasted Broccily ",
        price: 11,
      },
    ],
  },
  {
    id: 2,
    name: "Fiorellas",
    description:
      "Italian-American home cooked food with fresh pasta and sauces",
    dishes: [
      {
        name: "Flatbread",
        price: 14,
      },
      {
        name: "Carbonara",
        price: 18,
      },
      {
        name: "Spaghetti",
        price: 19,
      },
    ],
  },
  {
    id: 3,
    name: "Karma",
    description:
      "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
    dishes: [
      {
        name: "Dragon Roll",
        price: 12,
      },
      {
        name: "Pancake roll ",
        price: 11,
      },
      {
        name: "Cod cakes",
        price: 13,
      },
    ],
  },
];
var schema = buildSchema(`
type Query{
  restaurant(id: Int): Restaurant
  restaurants: [Restaurant]
},
type Restaurant {
  id: Int
  name: String
  description: String
  dishes:[Dish]
}
type Dish{
  name: String
  price: Int
}
input RestaurantInput{
  name: String
  description: String
}
type DeleteResponse{
  ok: Boolean!
}
type Mutation{
  setRestaurant(input: RestaurantInput): Restaurant
  deleteRestaurant(id: Int!): DeleteResponse
  editRestaurant(id: Int!, name: String!): Restaurant
}
`);
// The root provides a resolver function for each API endpoint

const index = (arr, key, value) => {
  const item = arr.findIndex(object => {
    return object[key] === value;
  });
  return item;
}

var root = {
  restaurant: (arg) => restaurants[index(restaurants, 'id', arg.id)],
  restaurants: () => restaurants,
  setRestaurant: ({input}) => {
    restaurants.push({
      id: restaurants.length + 1,
      name: input.name,
      description: input.description
    })
    return restaurants[restaurants.length - 1];
  },
  deleteRestaurant: ({id}) => {
    const ok = Boolean(restaurants[index(restaurants, 'id', id)]);
    restaurants = restaurants.filter(item => item.id !== id)
    return {ok}
  },
  editRestaurant: ({id, ...restaurant}) => {
    if(!restaurants[index(restaurants, 'id', id)]) {
      throw new Error("restaurant doesn't exist")
    }
    restaurants[index(restaurants, 'id', id)] = {
      ...restaurants[index(restaurants, 'id', id)],
      ...restaurant
    }
    return restaurants[index(restaurants, 'id', id)]
  },
};
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
var port = 4500;
app.listen(port, () => console.log("Running Graphql on Port:" + port));

//export default root;
