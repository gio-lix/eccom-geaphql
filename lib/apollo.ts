import {ApolloClient,HttpLink, InMemoryCache} from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    cache: new InMemoryCache()
})
export default apolloClient