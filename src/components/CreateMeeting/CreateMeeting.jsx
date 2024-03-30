import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import {
  createMeeting,
  addMeetingToUser,
} from "../../Query";
import { useMutation } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import AutocompleteEmails from "../AutocompleteEmails/AutocompleteEmails";
import { convertToISOString } from "../../utils/convertToISOString";

function CreateMeeting({ email }) {
  const [open, setOpen] = React.useState(false);
  const [addMeeting, { data: createdMeetingData, error }] =
    useMutation(createMeeting);
  const [pinMeetingToUser] = useMutation(addMeetingToUser);
  const divStyles = {
    margin: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
   const [invitedUsers, setInvitedUsers] = useState(null);

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
            for(let i = 0; i < invitedUsers.length; i++) {
              const invitedUser = invitedUsers[i];
              await pinMeetingToUser({
                variables: {
                  userEmail: invitedUser,
                  id,
                  start,
                  end,
                  host: email,
                  link,
                },
              });
            }
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
      start: convertToISOString(formJson.date, formJson.startTime),
      end: convertToISOString(formJson.date, formJson.endTime),
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
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
          <div style={divStyles}>
            <span>Date:</span>
            <DatePicker required name="date" />
          </div>
          <div style={divStyles}>
            <span>Start time (UTC timezone):</span>
            <TimePicker required name="startTime" />
          </div>
          <div style={divStyles}>
            <span>End time(UTC timezone):</span>
            <TimePicker required name="endTime" />
          </div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="link"
            name="link"
            label="Provide a link"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="host"
            name="host"
            label="Host"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={email}
          />
          <AutocompleteEmails invitedUsers={invitedUsers} hostMail={email} setValue={setInvitedUsers}/>
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
