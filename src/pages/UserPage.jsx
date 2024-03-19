import { useSubscription } from "@apollo/client";
import { getUser } from "../Query";
import CreateMeeting from "../components/CreateMeeting/CreateMeeting";
import Calendar from "../components/Calendar/Calendar";

export const UserPage = ({user}) => {

    const { data, error: subscriptionError } = useSubscription(getUser(user.email));
    console.log(user.email);
    console.log(data);
    if (!data || !data.queryUser) return (<h1>Connecting...</h1>);
    if (subscriptionError) return (<h1>Error...</h1>);

    const userData = data.queryUser[0];
    console.log(userData);
    
    return (
        <div>
            {
                userData && userData.email && userData.meetings ? (
                    <>
                        <div>{userData.email}</div>
                        <CreateMeeting email={userData.email}/>
                        {!!userData.meetings.length ? <div>
                            <h2>Your calendar</h2>
                            <Calendar meetings={userData.meetings}/>
                        </div> : <h2>No meetings planned</h2>} 
                    </>
                ) : <> No user data found ...</>
            }
        </div>
    );
}