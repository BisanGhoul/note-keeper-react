import { useState } from "react";
import useNotes from "../hooks/useNotes";
import { formatDateToJerusalemTime } from "../utilities/dateFormatter.js";
import DeleteIcon from "../assets/delete-icon-40.svg";
import "../styles/Note.css";

const colors = ["#FFFF99", "#FFB6C1", "#ADD8E6", "#90EE90", "#FFDAB9"];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

function Note({ id, title, content, creationDate }) {
  const { removeNote, patchNoteHandler } = useNotes();
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [backgroundColor] = useState(getRandomColor);

  creationDate = formatDateToJerusalemTime(creationDate); //format date to Jerusalem time

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      removeNote(id);
    }
  };

  const handleSave = async () => {
    await patchNoteHandler(id, {
      title: editedTitle,
      content: editedContent,
    });
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setOpenDialog(false);
  };

  return (
    <>
      <div
        className="note-container"
        style={{ backgroundColor }}
        onClick={() => setOpenDialog(true)}
      >
        <div className="note-header">
          <p className="note-title">{title}</p>
          <p className="note-content">{content}</p>
        </div>
        <div className="note-footer">
          <p className="creation-date">{creationDate}</p>
          <button
            className="delete-note-btn"
            aria-label="Delete note"
            data-delete-note-btn
            onClick={(e) => {
              e.stopPropagation(); // prevent opening dialog when deleting
              handleDelete();
            }}
          >
            <img src={DeleteIcon} alt="delete icon" />
          </button>
        </div>
      </div>

      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>Edit Note</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Content"
            />
            <div className="dialog-buttons">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Note;
