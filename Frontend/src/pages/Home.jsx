import { useState, useEffect } from "react";
import api from "../API";
import Note from "../components/Note";
import Navbar from "../components/Navbar";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <p className="text-gray-600 text-lg">Capture your thoughts, organize your ideas</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-3xl">📋</span> Your Notes
              </h2>
              
              {notes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <span className="text-6xl mb-4 block">📭</span>
                  <p className="text-lg">No notes yet. Create your first note!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-3xl">✨</span> Create Note
              </h2>
              
              <form onSubmit={createNote} className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-800 placeholder-gray-400"
                    placeholder="Enter note title..."
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={7}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-800 placeholder-gray-400 resize-none"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                >
                  Create Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
