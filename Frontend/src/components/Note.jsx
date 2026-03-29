function Note({ note, onDelete }) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US");
  return (
    <div>
      <p className="title">{note.title}</p>
      <p className="content">{note.content}</p>
      <p className="createdAt">{formattedDate}</p>
      <button className="deleteNote" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
