import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react"; 
import Meetings from "../Meetings/Meetings";

function MeetingDialog({ meetings, open, handleClose, day, userMail }) {
  return (
    <React.Fragment>
      {meetings ? <Dialog open={open}>
        <DialogTitle>{day ? `Your meetings on ${day}` : "Your meetings"}</DialogTitle>
        <DialogContent>
            <Meetings handleClose={handleClose} userMail={userMail} meetings={meetings[Object.keys(meetings)[0]]}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog> : null}
      
    </React.Fragment>
  );
}
export default MeetingDialog;
