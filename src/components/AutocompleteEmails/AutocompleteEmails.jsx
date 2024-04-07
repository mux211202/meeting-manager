import React, { useState, useEffect, useCallback } from "react";
import { filterUserByEmail } from "../../Query";
import client from "../../ApolloSetup";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function AutocompleteEmails({setValue, invitedUsers, hostMail, defaultValue}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState("");

  useEffect(() => {
    const getParticipants = async () => {
      setLoading(true);
      const query = filterUserByEmail(autocompleteValue);
      const { data: queryUser } = await client.query({ 
        query,
      });
      const filteredUsers = queryUser.queryUser.filter((user) => (user.email !== hostMail && !invitedUsers?.includes(user.email)));

      setOptions(filteredUsers.map((user) => user.email));
      setLoading(false);
      return queryUser;
    };
    getParticipants();
  }, [autocompleteValue, hostMail, setAutocompleteValue, invitedUsers, open]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      multiple
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onChange={(e, newValue, reason, details) => {
        setValue(newValue);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={invitedUsers || []}
      isOptionEqualToValue={()=>false}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      renderInput={(params) => (
          <TextField
              {...params}
              label="Invite users"
              InputProps={{
                  ...params.InputProps,
                  value: autocompleteValue,
                  endAdornment: (
                      <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                      </React.Fragment>
                  )
              }}
          />
      )}
    />
  );
}