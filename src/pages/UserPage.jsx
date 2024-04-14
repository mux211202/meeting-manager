import { useSubscription } from "@apollo/client";
import { getUser } from "../utils/query";
import CreateMeeting from "../components/CreateMeeting/CreateMeeting";
import Calendar from "../components/Calendar/Calendar";
import  { USER_MEETINGS } from "../configs/userPageConfig"

export const UserPage = ({user}) => {

    const { data, error: subscriptionError } = useSubscription(getUser(user.email));
    
    if ((!data || !data.queryUser) && !localStorage.getItem(USER_MEETINGS)) {
        return (<h1>Connecting...</h1>);
    }
    
    if (subscriptionError) return (<h1>Error...</h1>);

    if (data?.queryUser[0]) {
        localStorage.setItem(USER_MEETINGS, JSON.stringify(data.queryUser[0]));
    }

    const userData = data?.queryUser[0] || JSON.parse(localStorage.getItem(USER_MEETINGS)) || null;
    
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