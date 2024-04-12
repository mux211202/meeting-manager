import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  createMeeting,
  addMeetingToUser,
} from "../../utils/query";
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { date } from "../../utils/date";
import { MeetingForm } from "../MeetingForm/MeetingForm";
import {pinMeetingToUsers} from "../../utils/userMeetings";

function CreateMeeting({ email }) {
  const [open, setOpen] = React.useState(false);
  const [addMeeting, { data: createdMeetingData, error }] =
    useMutation(createMeeting);
  const [pinMeetingToUser] = useMutation(addMeetingToUser);
  const [invitedUsers, setInvitedUsers] = useState([]);

  useEffect(() => {
    const meeting = createdMeetingData?.addMeeting?.meeting[0];

    function handleMutation() {
      if (
        email &&
        meeting &&
        meeting.start &&
        meeting.end &&
        meeting.link &&
        meeting.id
      ) {
        const { id, start, end, link } = createdMeetingData.addMeeting.meeting[0];
        pinMeetingToUser({
          variables: {
            userEmail: email,
            id,
            start,
            end,
            host: email,
            link,
          },
        }).then( async () => {
          if(invitedUsers?.length) {
            await pinMeetingToUsers(invitedUsers, meeting, pinMeetingToUser )
          }
        }).then(() => {
          handleClose();
        });
      }
    }
    handleMutation();
  }, [createdMeetingData, pinMeetingToUser, email, invitedUsers]);

  const handleClickOpen = () => {
    setInvitedUsers(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    const updatedFormData = {
      ...formJson,
      start: date(formJson.date, formJson.startTime),
      end: date(formJson.date, formJson.endTime),
      host: email,
    };

    delete updatedFormData.startTime;
    delete updatedFormData.endTime;
    delete updatedFormData.date;

    if (
      updatedFormData &&
      updatedFormData.start &&
      updatedFormData.end &&
      updatedFormData.link
    ) {
      addMeeting({ variables: { ...updatedFormData } });
    }
  };

  return (
    <React.Fragment>
      {error && <p>Error: {error.message}</p>}
      <Button variant="outlined"  disabled={!navigator.onLine} onClick={handleClickOpen}>
        Create Meeting
      </Button>
      {
        !navigator.onLine && <div> You are offline. The application is in read-only mode! </div>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle>Create Meeting</DialogTitle>
        <DialogContent>
          <MeetingForm email={email} invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default CreateMeeting;
