import {ApolloClient,HttpLink, InMemoryCache} from "@apollo/client";

// const isBrowser = typeof window !== 'undefined';
// const authCookie = (isBrowser) ? Cookie.get('idToken') : null;

const apolloClient = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache()
})
export default apolloClient