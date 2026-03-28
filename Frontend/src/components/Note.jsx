import React from "react";
import "../styles/Note.css";

function Note({note, onDelete}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });

    return (
        <div className="note-card">
            {/* Decorative Tape Strip */}
            <div className="tape"></div>
            
            <div className="note-header">
                <h2 className="note-title">{note.title}</h2>
                <div className="note-date">{formattedDate}</div>
            </div>
            
            <p className="note-content">{note.content}</p>
            
            <div className="note-actions">
                <button className="delete-btn" onClick={() => onDelete(note.id)}>
                    <span className="ink-splash">✖</span> Tear out
                </button>
            </div>
        </div>
    );
}

export default Note;