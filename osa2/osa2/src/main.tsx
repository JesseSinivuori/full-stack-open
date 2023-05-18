import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

export type Note = {
  id: number;
  content: string;
  important: boolean;
};

export type Notes = Note[];

const notes: Notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App notes={notes} />
  </React.StrictMode>
);
