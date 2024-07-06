import NoteContext from "./NoteContext";
import { useState } from "react";
 
const NoteState = (props) => {
   const host = "http://192.168.45.116:3000"
   const notesInitial = []
   const [notes, setNotes] = useState(notesInitial)
   const [user, setuser] = useState(null)
// get user information
const getuser = async () => {
  try {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();
    setuser(userData); // Assuming setUser is the state setter for user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error as needed, e.g., redirect to login page or display an error message
  }
};





  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setNotes(json)
  }

  // // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/note/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, user,addNote, deleteNote, editNote, getNotes,getuser }  }>
      {props.children}
    </NoteContext.Provider>
  );

};
export default NoteState;
