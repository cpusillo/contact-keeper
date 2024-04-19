import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  return (
    <>
      <h1>Contacts List</h1>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="new-section">
          <Button onClick={openCreateModal}>Create Contact</Button>
        </div>
        <ContactList contacts={contacts} />
        {isModalOpen && (
          <Modal open={isModalOpen} onClose={closeModal}>
            <Box sx={style}>
              <span className="close" onClick={closeModal}>
                <CloseIcon />
              </span>
              <ContactForm />
            </Box>
          </Modal>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
