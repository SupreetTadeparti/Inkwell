import { ICP_backend } from '../../../declarations/ICP_backend';
import backIcon from "../assets/img/back.svg"
import RenamableText from './RenamableText';
import { useAuth } from '../AuthContext';

const NoteHeader = ({ note }) => {
  const { actor } = useAuth();

  console.log("NoteHeader: ", note, note.category);
  const save = () => {
    console.log(note);
  }

  return (
    <div className="top-bar">
      <div className="center">
        <img src={backIcon} alt="back icon" className="back-icon button" />
      </div>
      <div className="note-details center">
        <div className="category-name" style={{ backgroundColor: note.category.length === 0 ? "white" : note.category.color, color: note.category.length === 0 ? "black" : "white" }}>
          {note.category.length === 0 ? "All" : note.category.name}
        </div>
        /
        <h1 className='note-title'><RenamableText content={note.title} onSave={async (title) => {
          if (!note.id) return;
          await (actor ?? ICP_backend).updateNote(note.id, title, [], [])
        }} /></h1>
      </div>
      <div className="center">
        <div className="save-button button" onClick={save}>
          Save
        </div>
      </div>
    </div>
  );
}

export default NoteHeader;