import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useNotes from "../hooks/useNotes.js";
import SearchIcon from "../assets/search-icon-35.svg";
import "../styles/SearchNote.css";

function SearchNote() {
  const [searchQuery, setSearchQuery] = useState("");

  const { error, searchNotes } = useNotes();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    try {
      await searchNotes(searchQuery);
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }

    setSearchQuery("");
  };

  return (
    <>
      <form onSubmit={handleSearch} className="search-container container">
        <button className="search-button" aria-label="Search" data-search-btn>
          <img src={SearchIcon} alt="search cion" />
        </button>
        <label htmlFor="search" className="visually-hidden">
          Search tasks
        </label>
        <input
          type="text"
          id="search"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-search-input
        />
      </form>
      <ToastContainer />
    </>
  );
}
export default SearchNote;
