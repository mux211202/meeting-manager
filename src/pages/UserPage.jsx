import { useSubscription } from "@apollo/client";
import { getUser } from "../Query";
import CreateMeeting from "../components/CreateMeeting/CreateMeeting";
import Meetings from "../components/Meetings/Meetings";

export const UserPage = () => {

    const { data, error: subscriptionError } = useSubscription(getUser("0xfffd8d728febd7b1"));
    if (!data || !data.queryUser) return (<h1>Connecting...</h1>);
    if (subscriptionError) return (<h1>Error...</h1>);

    const userData = data.queryUser[0];
    console.log(userData);

    return (
        <>
            <div>{userData.email}</div>
            <CreateMeeting/>
            <div>
                <h2>Meetings:</h2>
                <Meetings meetings={userData.meetings}/>
            </div>
        </>
    );
}