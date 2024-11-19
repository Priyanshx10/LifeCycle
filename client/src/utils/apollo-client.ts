import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create the HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // Ensure this is the correct URI for your server
});

// Add an authorization header using the `setContext` link
const authLink = setContext(() => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // Return the headers with the token (if it exists)
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initialize the Apollo Client
const client = new ApolloClient({
  // Combine the authLink and httpLink
  link: authLink.concat(httpLink),
  // Use InMemoryCache for caching
  cache: new InMemoryCache(),
  // Add default options for error handling
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network", // Use cache and network together
      errorPolicy: "ignore", // Ignore partial errors during queries
    },
    query: {
      fetchPolicy: "network-only", // Always fetch fresh data for queries
      errorPolicy: "all", // Handle all errors
    },
    mutate: {
      errorPolicy: "all", // Handle all errors for mutations
    },
  },
});

export default client;
