import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Alert from "@mui/material/Alert";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
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

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <>
      <h2>Contacts List</h2>
      {/* {console.log(contacts)} */}
      <div className="new-section">
        <Button onClick={openCreateModal} startIcon={<PersonAddIcon />}>
          Create Contact
        </Button>
      </div>
      {contacts.length > 0 ? (
        <ContactList
          contacts={contacts}
          updateContact={openEditModal}
          updateCallback={onUpdate}
        />
      ) : (
        <Alert severity="warning">
          Nothing here yet! Click &lsquo;Create&lsquo; above to get started
        </Alert>
      )}

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={closeModal}>
          <Box sx={style}>
            <span className="close" onClick={closeModal}>
              <CloseIcon />
            </span>
            <ContactForm
              existingContact={currentContact}
              updateCallback={onUpdate}
            />
          </Box>
        </Modal>
      )}
    </>
  );
}

export default App;
