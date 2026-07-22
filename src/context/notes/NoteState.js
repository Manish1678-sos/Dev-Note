import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  // Get authentication token

  // Get all notes
  const getNotes = async () => {
  try {
    const response = await fetch(`${host}/api/notes/fetchallnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token') ,
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log("Notes fetched:", json); 
      setNotes(json);
    } else {
      console.error("Backend Error Response:", json);
    }
  } catch (error) {
    console.log("Error fetching notes:", error);
  }
};

  // Add a note
const addNote = async (title, description, tag) => {
  try {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token') ,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    if (response.ok) {
      console.log("Successfully added note:", json); 
      setNotes((prevNotes) => [...prevNotes, json]);
    } else {
      console.log("Failed to add note:", json);
    }
  } catch (error) {
    console.log("Error adding note:", error);
  }
};

  
  // Delete a note
const deleteNote = async (id) => {
  try {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token') ,
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log(`Note with ID ${id} deleted successfully!`, json); // 👈 কনসোলে মেসেজ দেখাবে
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } else {
      console.log("Failed to delete note:", json);
    }
  } catch (error) {
    console.log("Error deleting note:", error);
  }
};

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({
          title,
          description,
          tag,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id
              ? {
                  ...note,
                  title,
                  description,
                  tag,
                }
              : note
          )
        );
      } else {
        console.log(json);
      }
    } catch (error) {
      console.log("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;