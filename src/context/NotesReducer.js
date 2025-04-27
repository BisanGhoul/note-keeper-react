export const ACTIONS = {
  LOADED: "loaded",
  SEARCHED: "searched",
  ADDED: "added",
  REMOVED: "removed",
  EDITED: "edited",
};

export function NotesReducer(notes, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.LOADED:
      return payload.notes || [];

    case ACTIONS.SEARCHED:
      return payload.notes || [];

    case ACTIONS.ADDED:
      const existing = notes.find((note) => note._id === payload.noteItem._id);
      if (existing) {
        return notes.map((note) =>
          note._id === payload.noteItem._id
            ? { ...note, ...payload.noteItem }
            : note
        );
      }
      return [...notes, payload.noteItem];

    case ACTIONS.REMOVED:
      return notes.filter((note) => note._id !== payload.id);

    case ACTIONS.EDITED: {
      const updatedNote = payload.note;
      console.log("Updated note in reducer:", updatedNote); // Debug
      return notes.map((note) =>
        note._id === updatedNote._id ? { ...note, ...updatedNote } : note
      );
    }

    default:
      throw new Error("Unknown action: " + type);
  }
}
