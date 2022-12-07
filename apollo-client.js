import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// const httpLink = createHttpLink({
//   uri: "https://countries.trevorblades.com", // TODO: process.env.GRAPPLE_API_URI + process.env.GRAPPLE_API_GRAPHQL_PATH
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "", // GET
//     },
//   };
// });

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com', // authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
