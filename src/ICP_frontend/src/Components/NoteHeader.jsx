import { ICP_backend } from "../../../declarations/ICP_backend";
import backIcon from "../assets/img/back.svg";
import saveIcon from "../assets/img/save.svg";
import trashIcon from "../assets/img/trash.svg";
import RenamableText from "./RenamableText";
import CategorySelector from "./CategorySelector";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const NoteHeader = ({ note, setNote }) => {
  const { actor } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="top-bar">
      <div className="center">
        <div
          className="back-btn button"
          onClick={() => {
            navigate(`/app?canisterId=${process.env.CANISTER_ID}`);
          }}
        >
          <img src={backIcon} alt="back icon" className="back-icon" />
        </div>
      </div>
      <div className="note-details center">
        <CategorySelector note={note} setNote={setNote} />
        /
        <h1 className="note-title">
          <RenamableText
            minLength={1}
            maxLength={15}
            content={note.title}
            onSave={async (title) => {
              if (note.id === null) return;
              await (actor || ICP_backend).updateNote(
                note.id,
                title,
                note.content,
                note.category
              );
              setNote((prev) => ({ ...prev, title: title }));
            }}
          />
        </h1>
      </div>
      <div className='top-buttons'>
        <div className="center">
          <div
            className="save-btn button"
            onClick={async () => {
              await (actor || ICP_backend).updateNote(
                note.id,
                note.title,
                note.content,
                note.category
              );
            }}
          >
            <img src={saveIcon} />
            <div className="save-name">Save</div>
          </div>
        </div>

        <div className="center">
          <div
            className="delete-btn button"
            onClick={async () => {
              await (actor || ICP_backend).deleteNote(note.id);
              navigate(`/app?canisterId=${process.env.CANISTER_ID}`);
            }}
          >
            <img src={trashIcon} className="trash-img" />
            <div className="delete-name">Delete</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NoteHeader;
