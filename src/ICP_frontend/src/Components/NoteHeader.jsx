import CategorySelector from "./CategorySelector";
import shareIcon from "../assets/img/share.svg";
import trashIcon from "../assets/img/trash.svg";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import saveIcon from "../assets/img/save.svg";
import backIcon from "../assets/img/back.svg";
import RenamableText from "./RenamableText";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { notify } from "../util";
import SharePopup from "./SharePopup"; // You'll need to create this component

const NoteHeader = ({ note, setNote }) => {
  const { authClient, authenticated, getActor } = useAuth();
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  useEffect(() => {
    if (authenticated === null) return;

    (async () => {
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal();
      setIsOwner(JSON.stringify(principal) === JSON.stringify(note.owner));
    })();
  }, [note, authenticated]);

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
        <CategorySelector note={note} setNote={setNote} isOwner={isOwner} />/
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
          <div
            className="note-btn button"
            onClick={async () => {
              const res = await (
                await getActor()
              ).updateNote(
                note.id,
                note.title,
                note.content,
                note.category ? note.category : []
              );
              if ("Failure" in res) {
                notify(res.Failure);
              } else {
                notify("Successfully saved!");
              }
            }}
          >
            <img src={saveIcon} alt="" />
            <div className="btn__name">Save</div>
          </div>
        </div>
        {isOwner && (
          <>
            <div className="center">
              <div
                className="note-btn button"
                onClick={() => setShowSharePopup(true)}
              >
                <img src={shareIcon} alt="" />
                <div className="btn__name">Share</div>
              </div>
            </div>

            <div className="center">
              <div
                className="note-btn button"
                onClick={async () => {
                  const res = await (await getActor()).deleteNote(note.id);
                  if ("Failure" in res) {
                    notify(res.Failure);
                  } else {
                    notify("Successfully deleted!");
                    navigate(`/app?canisterId=${process.env.CANISTER_ID}`);
                  }
                }}
              >
                <img src={trashIcon} alt="" className="trash-img" />
                <div className="btn__name">Delete</div>
              </div>
            </div>
          </>
        )}
      </div>
      {showSharePopup && (
        <SharePopup noteId={note.id} onClose={() => setShowSharePopup(false)} />
      )}
    </div>
  );
};

export default NoteHeader;
