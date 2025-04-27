import SearchNote from "./SearchNote";
import "../styles/Header.css";

function Header() {
  return (
    <>
      <header className="header">
        <h1 className="title">My Note Keeper</h1>
        <SearchNote />
      </header>
    </>
  );
}

export default Header;
