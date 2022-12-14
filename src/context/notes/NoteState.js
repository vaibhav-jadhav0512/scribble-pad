import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:9999";
  const notesInit = [];
  const [notes, setnotes] = useState(notesInit);
  const getAllNotes = async () => {
    const res = await fetch(`${host}/scribble-pad/get/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    });
    setnotes(await res.json());
  };
  const addNote = async (title, description, tag) => {
    const res = await fetch(`${host}/scribble-pad/note/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await res.json();
    const note = json;
    setnotes(notes.concat(note));
  };
  const editNote = async (noteId, title, description, tag) => {
    await fetch(`${host}/scribble-pad/note/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ noteId, title, description, tag }),
    });
    let newNotes = await JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element.noteId === noteId) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        if (index !== 0) break;
      }
      setnotes(newNotes);
    }
  };
  const deleteNote = async (id) => {
    await fetch(`${host}/scribble-pad/note/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    });
    const updatedNotes = notes.filter((note) => {
      return note.noteId !== id;
    });
    setnotes(updatedNotes);
  };
  return (
    <noteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
