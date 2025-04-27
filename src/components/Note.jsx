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
  const { removeNote } = useNotes();
  const [backgroundColor] = useState(getRandomColor);

  creationDate = formatDateToJerusalemTime(creationDate); //format date to Jerusalem time

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      removeNote(id);
    }
  };

  return (
    <>
      <div className="note-container" style={{ backgroundColor }}>
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
    </>
  );
}

export default Note;
