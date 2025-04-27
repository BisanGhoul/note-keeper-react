import { createContext, useContext } from "react";

export const NotesContext = createContext(null);
export const NotesDispatchContext = createContext(null);

export const useNotesContext = () => useContext(NotesContext);
export const useNotesDispatch = () => useContext(NotesDispatchContext);
