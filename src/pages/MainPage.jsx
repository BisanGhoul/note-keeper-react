import useNotes from "../hooks/useNotes.js";
import Header from "../components/Header.jsx";
import AddNote from "../components/AddNote.jsx";
import Note from "../components/Note.jsx";

function MainPage() {
  const { notes, loading } = useNotes();
  return (
    <>
      <Header />
      <main>
        <section className="add-note-container">
          <AddNote />
        </section>
        <section className="notes-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            notes.map((note) => {
              return (
                <Note
                  key={note._id}
                  id={note._id}
                  title={note.title}
                  content={note.content}
                  creationDate={note.creationDate}
                />
              );
            })
          )}
        </section>
      </main>
    </>
  );
}

export default MainPage;
