import React from "react"

function NotePreview({ title, content, color }) {
    return <div className="note-preview glass" style={{ "--note-clr": color }}>
        <div className="note-preview__title">{title}</div>
        <div className="note-preview__content">{content}</div>
    </div>
}

export default NotePreview