import { useState } from "react";
import NotePreview from "./NotePreview";

function Notes() {
    const [notes, setNotes] = useState([
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
        { title: "Title", content: "Contents", color: "#ff6a6a" },
    ]);

    return <div className="notes-container">
        {notes.map(note => <NotePreview title={note.title} content={note.content} color={note.color} />)}
    </div>
}

export default Notes;