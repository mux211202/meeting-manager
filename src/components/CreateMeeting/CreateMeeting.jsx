import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import { createMeeting, addMeetingToUser } from "../../Query";
import { useMutation } from "@apollo/client";
import React, { useEffect } from 'react';
import { convertToISOString } from '../../utils/convertToISOString';

function CreateMeeting() {
  const [open, setOpen] = React.useState(false);
  const [stateFormData, setFormData] = React.useState(null);
  const [addMeeting, { data: createdMeetingData }] = useMutation(createMeeting);
  const [pinMeetingToUser] = useMutation(addMeetingToUser);

  useEffect(() => {
    if(stateFormData && stateFormData.start && stateFormData.end && stateFormData.link) {
      addMeeting({ variables: { ...stateFormData } });
    }
  }, [stateFormData, addMeeting]);

  useEffect(() => {
    const meeting = createdMeetingData?.addMeeting?.meeting[0];
    if (meeting && stateFormData && Object.keys(stateFormData).every((k) => stateFormData[k] === meeting[k])) {
      const { id, start, end, link, host} = createdMeetingData.addMeeting.meeting[0];
      pinMeetingToUser({ variables: { 
        userId: "0xfffd8d728febd7b1", 
        id,
        start,
        end,
        host,
        link,
      }})
      setFormData(null);
      handleClose();
    }
  }, [createdMeetingData, pinMeetingToUser, stateFormData])

  const handleClickOpen = () => {
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
        start: convertToISOString(formJson.startDate, formJson.startTime), 
        end: convertToISOString(formJson.startDate, formJson.startTime)
    }

    delete updatedFormData.startTime;
    delete updatedFormData.startDate;
    delete updatedFormData.endTime;
    delete updatedFormData.endDate;

    setFormData(updatedFormData);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle>Create Meeting</DialogTitle>
        <DialogContent>
            <div>
                Start (UTC timezone):
                <DatePicker required name="startDate"/>
                <TimePicker required name="startTime"/>
            </div>
            <div>
                End (UTC timezone):
                <DatePicker required name="endDate"/>
                <TimePicker required name="endTime"/>
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
                label="Who is host?"
                type="text"
                fullWidth
                variant="standard"
            />
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