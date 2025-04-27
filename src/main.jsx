import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NotesProvider } from "./context/NotesProvided";
import App from "./App.jsx";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <NotesProvider>
        <App />
      </NotesProvider>
  </StrictMode>
);
