import React from 'react'
import backIcon from "../assets/img/back.svg"

const NoteHeader = () => {
  return (
    <div className="top-bar glass">
      <img src={backIcon} alt="back icon" className="back-icon" />
      NoteHeader
    </div>
  );
}

export default NoteHeader;