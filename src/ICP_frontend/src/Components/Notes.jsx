import NotePreview from "./NotePreview";

function Notes({ notes, removeNoteFromState }) {
  return (
    <div className="notes-container">
      {notes.map((note) => (
        <NotePreview
          key={note.id}
          note={note}
          removeNoteFromState={removeNoteFromState}
        />
      ))}
    </div>
  );
}

export default Notes;