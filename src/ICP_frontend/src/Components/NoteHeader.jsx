import { ICP_backend } from '../../../declarations/ICP_backend';
import backIcon from "../assets/img/back.svg"
import RenamableText from './RenamableText';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const NoteHeader = ({ note, setNote }) => {
  const { actor } = useAuth();
  const navigate = useNavigate()

  return (
    <div className="top-bar">
      <div className="center">
        <div className="glass back-btn button" onClick={() => {
          navigate(`/app?canisterId=${process.env.CANISTER_ID}`);
        }}>
          <img src={backIcon} alt="back icon" className="back-icon" />
        </div>
      </div>
      <div className="note-details center">
        <div className="category-name" style={{ backgroundColor: note.category.length === 0 ? "white" : note.category.color, color: note.category.length === 0 ? "black" : "white" }}>
          {note.category.length === 0 ? "All" : note.category.name}
        </div>
        /
        <h1 className='note-title'><RenamableText minLength={1} maxLength={15} content={note.title} onSave={async (title) => {
          if (note.id === null) return;
          await (actor || ICP_backend).updateNote(note.id, title, note.content, note.category)
          setNote(prev => ({ ...prev, title: title }))
        }} /></h1>
      </div>
      <div className="center">
        <div className="save-btn button glass" onClick={async () => {
          await (actor || ICP_backend).updateNote(note.id, note.title, note.content, note.category)
        }}>
          Save
        </div>
      </div>
    </div>
  );
}

export default NoteHeader;