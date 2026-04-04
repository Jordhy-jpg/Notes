function Note({ note, onDelete }) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border border-gray-100 hover:border-indigo-200 group">
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{note.title}</h3>
      
      <div className="mb-4">
        <p className="text-gray-600 text-sm whitespace-pre-wrap line-clamp-4 leading-relaxed">{note.content}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-gray-400">{formattedDate}</span>
        
        <button 
          onClick={() => onDelete(note.id)}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 group/btn"
        >
          <span className="text-lg">🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default Note;
