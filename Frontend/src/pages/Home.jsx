import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [activeTab, setActiveTab] = useState("read");

  const getNotes = () => {
    api
      .get("/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getNotes();
  }, []);

  const deleteNote = (id) => {
    api
      .delete(`/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          // success without annoying alert for smoother feel
        } else alert("Failed to delete note");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          setContent("");
          setTitle("");
          setActiveTab("read");
        } else alert("Failed to create note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="desk-container">
      <div className="notebook">
        {/* Notebook Spiral Binding Effect */}
        <div className="spiral-binding">
          {[...Array(12)].map((_, i) => (
            <div className="spiral-ring" key={i}></div>
          ))}
        </div>

        {/* Notebook Tabs */}
        <div className="notebook-tabs">
          <button
            className={`tab ${activeTab === "read" ? "active" : ""}`}
            onClick={() => setActiveTab("read")}
          >
            My Entries
          </button>
          <button
            className={`tab ${activeTab === "write" ? "active" : ""}`}
            onClick={() => setActiveTab("write")}
          >
            New Entry
          </button>
          <button className="tab tab-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Notebook Pages Area */}
        <div className="notebook-page paper-texture">
          <div className="page-header">
            <h1>{activeTab === "read" ? "My Thoughts" : "Journal Entry"}</h1>
            <div className="header-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="page-content">
            {activeTab === "write" && (
              <section className="create-note-section">
                <form className="create-note-form" onSubmit={createNote}>
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-input"
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      placeholder="What is this about?"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Entry:</label>
                    <textarea
                      name="content"
                      id="content"
                      className="form-input"
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Dear diary..."
                    ></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Save Entry
                    </button>
                  </div>
                </form>
              </section>
            )}

            {activeTab === "read" && (
              <section className="notes-section">
                <div className="notes-wall">
                  {notes.length === 0 ? (
                    <div className="notes-empty">
                      <p>The pages are blank...</p>
                    </div>
                  ) : (
                    notes.map((note) => (
                      <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
