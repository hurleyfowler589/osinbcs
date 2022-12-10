import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${process.env.GRAPPLE_API_URI}${process.env.GRAPPLE_API_GRAPHQL_PATH}`,
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY3MDY3MjQ2MiwiZXhwIjoxNjcwNjc2MDYyfQ.Ky6_J1wlAx0Gs_1gCqOCItBAUDFVTW4dhO148FaIc30";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // if (typeof window !== 'undefined') {
  //   token = localStorage.getItem('token');
  // }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
