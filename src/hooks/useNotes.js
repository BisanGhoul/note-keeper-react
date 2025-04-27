import { useState, useEffect } from "react";
import {
  createNote,
  getNotes,
  updateNote,
  patchNote,
  deleteNote,
  filterNotes,
} from "../services/notesService";
import { useNotesContext, useNotesDispatch } from "../context/NotesContext";
import { ACTIONS } from "../context/NotesReducer";

const useNotes = () => {
  const notes = useNotesContext();
  const dispatch = useNotesDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notes
  const fetchNotes = async (page = 1, limit = 100) => {
    setLoading(true);
    try {
      const data = await getNotes(page, limit);
      dispatch({ type: ACTIONS.LOADED, payload: { notes: data.notes } });
    } catch (err) {
      setError(err || "An error occurred while fetching notes.");
    } finally {
      setLoading(false);
    }
  };

  // Search notes
  const searchNotes = async (query = "", page = 1, limit = 100) => {
    setLoading(true);
    try {
      const data = await filterNotes(query, page, limit);
      console.log("Search results:", data.notes); // Debug
      dispatch({ type: ACTIONS.LOADED, payload: { notes: data.notes } });
    } catch (err) {
      setError(err || "An error occurred while fetching notes.");
    } finally {
      setLoading(false);
    }
  };

  // Create a new note
  const addNote = async (note) => {
    setLoading(true);
    try {
      const res = await createNote(note);
      dispatch({ type: ACTIONS.ADDED, payload: { noteItem: res.note } });
    } catch (err) {
      setError(err || "An error occurred while adding the note.");
    } finally {
      setLoading(false);
    }
  };

  // Full update
  const editNote = async (noteId, updatedNote) => {
    setLoading(true);
    try {
      const res = await updateNote(noteId, updatedNote);
      dispatch({ type: ACTIONS.EDITED, payload: { note: res.note } });
    } catch (err) {
      setError(err || "An error occurred while updating the note.");
    } finally {
      setLoading(false);
    }
  };

  // Partial update
  const patchNoteHandler = async (noteId, updatedFields) => {
    setLoading(true);
    try {
      const res = await patchNote(noteId, updatedFields);
      console.log("Note updated successfully:", res.note); //Debug

      dispatch({ type: ACTIONS.EDITED, payload: { note: res.note } });
    } catch (err) {
      setError(err || "An error occurred while partially updating the note.");
    } finally {
      setLoading(false);
    }
  };

  // Delete note
  const removeNote = async (noteId) => {
    setLoading(true);
    try {
      await deleteNote(noteId);
      dispatch({ type: ACTIONS.REMOVED, payload: { id: noteId } });
    } catch (err) {
      setError(err || "An error occurred while deleting the note.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    searchNotes,
    addNote,
    editNote,
    patchNoteHandler,
    removeNote,
  };
};

export default useNotes;
