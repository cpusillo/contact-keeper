import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ContactForm = ({ existingContact = {}, updateCallback}) => {
  // If there's an existing contact put that in, else leave an empty string
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  const updating = Object.entries(existingContact).length !== 0

  const onSubmit = async (e) => {
    // Dont automatically refresh the page
    //  e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };
    const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback()
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        onSubmit={onSubmit}
      >
        <TextField
          label="First name"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          label="Last name"
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextField
          label="email"
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
        <Button
          variant="outlined"
          color="success"
          type="submit"
          size="small"
        >
          {updating ? <TurnedInIcon /> : <PersonAddIcon />}
        </Button>
        </div>
      </Box>
    </>
  );
};

export default ContactForm;
