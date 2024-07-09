import backIcon from "../assets/img/back.svg";
import shareIcon from "../assets/img/share.svg";
import saveIcon from "../assets/img/save.svg";
import trashIcon from "../assets/img/trash.svg";
import RenamableText from "./RenamableText";
import CategorySelector from "./CategorySelector";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (msg) => {
  toast(msg, { position: "top-center" });
};

const NoteHeader = ({ note, setNote }) => {
  const { getActor } = useAuth();
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
        <CategorySelector note={note} setNote={setNote} />/
        <h1 className="note-title">
          <RenamableText
            minLength={1}
            maxLength={15}
            content={note.title}
            onSave={async (title) => {
              if (note.id === null) return;
              await (
                await getActor()
              ).updateNote(note.id, title, note.content, note.category);
              setNote((prev) => ({ ...prev, title: title }));
            }}
          />
        </h1>
      </div>
      <div className="top-buttons">
        <div className="center">
          <div className="note-btn button">
            <img src={shareIcon} alt="" />
            <div className="btn__name">Share</div>
          </div>
        </div>
        <div className="center">
          <div
            className="note-btn button"
            onClick={async () => {
              console.log(note.category);
              await (
                await getActor()
              ).updateNote(
                note.id,
                note.title,
                note.content,
                note.category ? note.category : []
              );
              notify("Successfully saved!");
            }}
          >
            <img src={saveIcon} alt="" />
            <div className="btn__name">Save</div>
          </div>
        </div>

        <div className="center">
          <div
            className="note-btn button"
            onClick={async () => {
              await (await getActor()).deleteNote(note.id);
              navigate(`/app?canisterId=${process.env.CANISTER_ID}`);
              notify("Successfully deleted!");
            }}
          >
            <img src={trashIcon} alt="" className="trash-img" />
            <div className="btn__name">Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteHeader;
