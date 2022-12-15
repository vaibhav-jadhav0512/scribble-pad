import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Modal from "./Modal";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;
  const history = useNavigate();
  const [note, setNote] = useState({
    noteId: 0,
    title: "",
    description: "",
    tag: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) history("/login");
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
      <AddNote showAlert={props.showAlert} />
      <Modal
        refs={ref}
        note={note}
        update={update}
        showAlert={props.showAlert}
      />
      <div className="row my-3">
        {notes.length === 0 && (
          <div className="container my-3 mx-1">
            <h6 className="text-danger">Please add new note!</h6>
          </div>
        )}
        {notes.map((note) => {
          return (
            <NoteItem
              key={note.noteId}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
