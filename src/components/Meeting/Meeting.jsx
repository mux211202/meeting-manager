import { convertFromISOString } from "../../utils/date";
import {useMutation, useSubscription} from "@apollo/client";
import { getMeetingUsers, addMeetingToUser, updateMeeting as updateMeetingMutation, removeMeetingFromUser as removeMeetingFromUserMutation } from "../../utils/query";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { MeetingForm } from "../MeetingForm/MeetingForm";
import dayjs from "dayjs";
import { date } from "../../utils/date";
import utc from 'dayjs/plugin/utc';
import {pinMeetingToUsers} from "../../utils/userMeetings";

dayjs.extend(utc);

export function Meeting({id, start, end, link, host, handleClose}) {
    const [invitedUsers, setInvitedUsers] = useState([]);
    const { data, loading } = useSubscription(getMeetingUsers, { variables: { id }});
    const [isEditMode, setIsEditMode] = useState(false);
    const [updateMeeting] = useMutation(updateMeetingMutation);
    const [removeMeetingFromUser] = useMutation(removeMeetingFromUserMutation);
    const [pinMeetingToUser] = useMutation(addMeetingToUser);
    const [defaultInvitedUsers, setDefaultInvitedUsers] = useState([]);

    useEffect(() => {
        const invitedUsers = 
            data?.queryUser?.filter(({meetings, email}) => meetings.length > 0 && email !== host).map(user => user.email) || null;
        setInvitedUsers(invitedUsers);

        if (!defaultInvitedUsers?.length) {
            setDefaultInvitedUsers(invitedUsers);
        }
    }, [data?.queryUser, host]);

    const getAddedUsers = () => {
        return invitedUsers.filter(user => !defaultInvitedUsers.includes(user))
    }

    const getDeletedUsers = () => {
        return defaultInvitedUsers.filter(user => !invitedUsers.includes(user))
    }

    const defaultValues = {
        date: dayjs.utc(start),
        startTime: dayjs.utc(start),
        endTime: dayjs.utc(end),
        link,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const updatedFormData = {
            link: formJson.link || "",
            start: date(formJson.date, formJson.startTime),
            end: date(formJson.date, formJson.endTime),
            host: host,
            id: id
        };

        delete updatedFormData.startTime;
        delete updatedFormData.endTime;
        delete updatedFormData.date;
        updateMeeting({
            variables: {
                ...updatedFormData
            },
        }).then(async () => {
            const deletedUsers = getDeletedUsers();
            const addedUsers = getAddedUsers();

            if (deletedUsers.length) {
                await removeMeetingFromUser({
                    variables: {
                        emails: deletedUsers,
                        meetingId: id
                    },
                });
            }

            if (addedUsers.length) {
                await pinMeetingToUsers(addedUsers, updatedFormData, pinMeetingToUser)
            }
        }).finally(() => {
            handleClose();
        });
    }

    return (
        <>
            {
                !isEditMode ? (
                    <div key={id}>
                        <div><strong>Start:</strong> {convertFromISOString(start)}</div>
                        <div><strong>End:</strong> {convertFromISOString(end)}</div>
                        <div><strong>Host:</strong> {host}</div>
                        <div><strong>Link:</strong> {link}</div>
                            {!loading ? (
                                <>
                                    {invitedUsers?.length ? (
                                        <div>
                                            <strong>Invited Users:</strong>
                                            <div>
                                                {invitedUsers.map((option) => (
                                                    <div key={"invted-"+option}>{option}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}
                                </>
                            ) : <Loader/>}

                        <br/>
                    </div>
                ) : <form id="update-form" onSubmit={handleSubmit}>
                    <MeetingForm
                        email={host} 
                        defaultValues={defaultValues} 
                        invitedUsers={invitedUsers} 
                        setInvitedUsers={setInvitedUsers}/>
                </form>
            }
            <Button onClick={() => setIsEditMode((state) => !state)}>
                {isEditMode ? "Cancel editing" : "Edit meeting"}
            </Button>
            {isEditMode? <Button form="update-form" type="submit">
                Apply Changes
            </Button>: null}
        </>
    )
}
