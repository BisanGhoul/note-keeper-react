import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useNotes from "../hooks/useNotes";
import "../styles/AddNote.css";

function AddNote() {
  const { error, addNote } = useNotes();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCancel = () => {
    setTitle("");
    setContent("");

    // Wait for animation to finish before collapsing the form
    setTimeout(() => {
      setIsExpanded(false);
    }, 400); // Match the duration of your CSS transition
  };

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      toast.error("Please enter a title or content!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    if (error) {
      toast.error(error.message || error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } else {
      await addNote({ title, content });
    }

    handleCancel();
  };

  return (
    <div
      className={`note-input-container ${isExpanded ? "expanded" : ""}`}
      onClick={handleClick}
    >
      {!isExpanded ? (
        <>
          <label htmlFor="new-note-placeholder" className="visually-hidden">
            Add a new note
          </label>
          <input
            type="text"
            id="new-note-placeholder"
            className="note-placeholder"
            placeholder="Take a note..."
            readOnly
          />
        </>
      ) : (
        <form
          className="note-form-container"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
        >
          <label htmlFor="new-note-title">Title</label>
          <hr className="note-divider" />
          <input
            type="text"
            id="new-note-title"
            className="note-input"
            placeholder="Title"
            aria-label="New note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="note-content">Note Content</label>
          <hr className="note-divider" />
          <textarea
            id="note-content"
            className="note-input"
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          ></textarea>

          <div className="note-form-buttons">
            <button
              type="button"
              onClick={handleCancel}
              className="note-cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="note-submit-btn">
              Add
            </button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default AddNote;
