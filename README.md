
# Congestion Tax Calculator #

  _"An application used to calculate the congestion tax for a city"_

### Getting Started

### Required global dependencies
- Node
- Yarn

### Local setup 🏡
- If the env file is not present in the `/typescript/src/config` folder, please add one by looking at the .env.example file.
- If the node_modules is not present in the `/typescript`, please run the following command - `yarn` in `/typescript` path.
- The Database doesnt require any setup.

### Running locally
- To start the app. run the following command - `yarn start:dev` in the `/typescript` path.
- To get the API Documentation, please go the following URL - `http://localhost:<port>/v1/api-docs`
- To check the Mongo Collection, please use the connection string (MONGO_URI) mentioned in the .env file.

### Testing 🧪
- There are unit and integration tests in the `/typescript/test` folder along with its mocks.
- To run the suite, please run the following command - `yarn test` in `/typescript` path.