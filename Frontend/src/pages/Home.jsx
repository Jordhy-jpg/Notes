import { useState, useEffect } from "react";
import api from "../API";
import Note from "../components/Note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        // console.log(data)
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getNotes();
  }, []);

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note Deleted");
        else alert("Failed to Delete Note");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) {
          alert("Note Created");
          setTitle("");
          setContent("");
        } else alert("Failed to Create Note");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
      ))}
      <h1>Create a Note</h1>
      <form onSubmit={createNote} method="post">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />

        <button type="submit">Create Note</button>
      </form>
    </div>
  );
}

export default Home;
