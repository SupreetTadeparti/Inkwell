import { useNavigate } from "react-router-dom";
import markdownToTxt from "markdown-to-txt";
import React, { useEffect, useState } from "react";
import trashIcon from "../assets/img/trash.svg";
import shareIcon from "../assets/img/share.svg";
import { notify } from "../util";
import { useAuth } from "../AuthContext";
import SharePopup from "./SharePopup";

function NotePreview({ note, removeNoteFromState }) {
  const { id, title, content, category, owner } = note;
  const navigate = useNavigate();
  const { authClient, authenticated, getActor } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  useEffect(() => {
    if (authenticated === null) return;

    (async () => {
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal();
      setIsOwner(JSON.stringify(principal) === JSON.stringify(owner));
    })();
  }, [authenticated]);

  const handleShareClick = (e) => {
    e.stopPropagation();
    setShowSharePopup(true);
  };

  return (
    <>
      <div
        className="note-preview glass"
        style={{
          "--note-clr": !isOwner
            ? "#000000"
            : category.length > 0
            ? category[0].color
            : "#ffffff",
        }}
        onClick={() => {
          navigate(`/note?canisterId=${process.env.CANISTER_ID}&id=${id}`);
        }}
      >
        <div className="note-preview__title">{title}</div>
        <div className="note-preview__content">{markdownToTxt(content)}</div>
        {isOwner && (
          <div className="note-preview__tools glass">
            <div
              className="tool-container"
              onClick={async (e) => {
                e.stopPropagation();
                const res = await (await getActor()).deleteNote(id);
                if ("Failure" in res) {
                  notify(res.Failure);
                } else {
                  notify("Successfully deleted!");
                  removeNoteFromState(id);
                }
              }}
            >
              <img src={trashIcon} alt="trash icon" />
            </div>
            <div className="tool-container" onClick={handleShareClick}>
              <img src={shareIcon} alt="share icon" />
            </div>
          </div>
        )}
      </div>
      {showSharePopup && (
        <SharePopup noteId={id} onClose={() => setShowSharePopup(false)} />
      )}
    </>
  );
}

export default NotePreview;
