import NotePreview from "./NotePreview";

function Notes({ notes }) {
  return (
    <div className="notes-container">
      {notes.map((note) => (
        <NotePreview
          id={note.id}
          title={note.title}
          content={note.content}
          color={
            note.category.length !== 0 ? note.category[0].color : "#ffffff"
          }
        />
      ))}
    </div>
  );
}

export default Notes;
