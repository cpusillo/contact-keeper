import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const [listItems, updateListItems] = useState(contacts);

  function handleOnDragEnd(result) {
    const items = Array.from(contacts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateListItems(items);
  }

  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        options
      );
      if (response.status == 200) {
        updateCallback();
      } else {
        console.error("Could not delete user");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="contacts">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {listItems.map(
                    ({ id, firstName, lastName, email }, index) => (
                      <Draggable
                        key={id}
                        draggableId={String(id)}
                        index={index}
                      >
                        {(provided) => (
                          <TableRow
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TableCell>{firstName}</TableCell>
                            <TableCell>{lastName}</TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>
                              <ButtonGroup
                                variant="outlined"
                                aria-label="Basic button group"
                              >
                                <Button
                                  variant="outlined"
                                  onClick={() => updateContact(contact)}
                                >
                                  <RefreshIcon />
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={() => onDelete(contact.id)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactList;
