import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${process.env.GRAPPLE_API_URI}${process.env.GRAPPLE_API_GRAPHQL_PATH}`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  const token =
    typeof window !== undefined ? localStorage.getItem("token") : null;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;
