# GraphQL_RestaurantDataExercise
 API endpoints to handle CRUD for Restaurant data for MIT course

## Description 
This is a simple Application to handle various API endpoints for Restaurant Data

## Purpose 
This was done as an assignment in the MIT course - Full Stack Development with Mern

---------

## Technologies Used 
- Javascript
- GraphQL

---------

## Installation 
- Clone this repository to your local machine
- Open a command line on your computer and run the command cd path-to-project-root (this should be the actual directory where the repository is located on your local machine)
- Within the same command-line window, run npm install
- Once the command completes successfully, run node index.js
- Open your browser of choice and browse to http://localhost:4500/graphql/

## How to Run 
- When the page is loaded in your browser, you will notice no default entries the following are the mutations one can use:
mutation editRestaurant($id: Int = 2, $name: String = "OLDO") {
  editRestaurant(id: $id, name: $name) {
    name
    description
  }
}

mutation setRestaurant {
  setRestaurant(input: {
    name: "Granite",
    description: "American",
  }) {
    id
    name
    description
  }
}

mutation deleteRestaurant($id: Int = 1) {
  deleteRestaurant(id: $id) {
    ok
  }
}

query getRestaurants {
  restaurants {
    id
    name
    description
    dishes {
      name
      price
    }
  }
}

query findRestaurant($id:Int = 1){
  restaurant(id:$id) {
    id
    description
    dishes {
      name
      price
    }
  }
}

---------

## Files 
- **/index.js** - Contains the code for CRUD API endpoints, data structure, and data

---------

## Improvements Made
- 2022-06-19: Changed provided code to not look at array position when id is passed but the actual id in the data

---------

## Contributing 
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[The MIT License (MIT)](https://github.com/slumpbuster/GraphQL_RestaurantDataExercise/blob/main/LICENSE)
