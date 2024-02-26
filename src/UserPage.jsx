import React, { useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { getUser, createUser, addMeetingToUser } from "./Query"
import "./index.css";

export const UserPage = () => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    // const [sendMessage, { error: mutationError }] = useMutation(addMeetingToUser);
    const { data, error: subscriptionError } = useSubscription(getUser("0xfffd8d728febd7b1"));
    if (!data || !data.queryUser) return (<h1>Connecting...</h1>);
    if (subscriptionError) return (<h1>Error...</h1>);

    const userData = data.queryUser[0];
    console.log(userData);

    return (
        <>
            <div>{userData.email}</div>
        </>
    );
}