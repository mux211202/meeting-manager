import { ApolloClient } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { InMemoryCache } from '@apollo/client/cache';
import { HttpLink, split } from '@apollo/client';
import { WebSocketLink } from "@apollo/link-ws";

//TODO: replace with env file
const endpoint = "https://blue-surf-1230055.us-east-1.aws.cloud.dgraph.io/graphql";

const wsLink = new WebSocketLink({
    uri: `wss://${endpoint}`,
    options: {
        reconnect: true
    }
});

const httpLink = new HttpLink({
    uri: `https://${endpoint}`
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

export default new ApolloClient({
    cache: new InMemoryCache(),
    link
});