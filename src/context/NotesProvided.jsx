import { useReducer } from "react";
import { NotesContext, NotesDispatchContext } from "./NotesContext";
import { NotesReducer } from "./NotesReducer";

export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(NotesReducer, []);

  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}
