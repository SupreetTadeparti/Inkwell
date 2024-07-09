import { useNavigate } from "react-router-dom";
import markdownToTxt from "markdown-to-txt";
import React from "react";
import trashIcon from "../assets/img/trash.svg";
import shareIcon from "../assets/img/share.svg";

function NotePreview({ id, title, content, color }) {
  const navigate = useNavigate();

  return (
    <div
      className="note-preview glass"
      style={{ "--note-clr": color }}
      onClick={() => {
        navigate(`/note?canisterId=${process.env.CANISTER_ID}&id=${id}`);
      }}
    >
      <div className="note-preview__title">{title}</div>
      <div className="note-preview__content">{markdownToTxt(content)}</div>
      <div className="note-preview__tools glass">
        <div className="tool-container"><img src={trashIcon} alt="trash icon" /></div>
        <div className="tool-container"><img src={shareIcon} alt="share icon" /></div>
      </div>
    </div>
  );
}

export default NotePreview;
