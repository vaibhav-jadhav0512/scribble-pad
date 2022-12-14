import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Modal from "./Modal";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;
  const [note, setNote] = useState({
    noteId: 0,
    title: "",
    description: "",
    tag: "",
  });

  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const updateNote = (currnote) => {
    ref.current.click();
    setNote(currnote);
  };

  const update = (note) => {
    setNote(note);
  };

  return (
    <>
      <AddNote />
      <Modal refs={ref} note={note} update={update} />
      <div className="row my-3">
        <h2>Your notes...</h2>
        {notes.length === 0 && (
          <div className="container my-3 mx-1">
            <h6 className="text-danger">Please add new note!</h6>
          </div>
        )}
        {notes.map((note) => {
          return (
            <NoteItem key={note.noteId} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;