import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import AutocompleteEmails from "../AutocompleteEmails/AutocompleteEmails";

export const divStyles = {
    margin: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

export function MeetingForm ({defaultValues, invitedUsers, email, setInvitedUsers}) {
    
    // TODO: fix default values
    return (
      <>
        <div style={divStyles}>
              <span>Date:</span>
              <DatePicker defaultValue={defaultValues?.date ? defaultValues?.date : null}  required name="date" />
            </div>
            <div style={divStyles}>
              <span>Start time (UTC timezone):</span>
              <TimePicker
                defaultValue={defaultValues?.startTime ? defaultValues?.startTime : null} 
                required name="startTime" />
            </div>
            <div style={divStyles}>
              <span>End time(UTC timezone):</span>
              <TimePicker 
                defaultValue={defaultValues?.endTime ? defaultValues?.endTime : null}
                required name="endTime" />
            </div>
            <TextField
              defaultValue={defaultValues?.link ? defaultValues?.link : null}
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
            <AutocompleteEmails defaultValue={Array.isArray(invitedUsers) ? invitedUsers : []} 
              invitedUsers={invitedUsers} hostMail={email} setValue={setInvitedUsers}/>
      </>
    )
  }