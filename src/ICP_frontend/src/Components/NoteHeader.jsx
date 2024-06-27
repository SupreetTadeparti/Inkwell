import React from 'react'
import backIcon from "../assets/img/back.svg"

const NoteHeader = () => {
  const categoryColor = "#ff6a6a";
  const categoryName = "Philosophy"
  return (
    <div className="top-bar">
      <img src={backIcon} alt="back icon" className="back-icon" />
      <div className="note-details center">
        <div className="category-name" style={{ backgroundColor: categoryColor }}>{categoryName}</div>
        /
        <h1 className='note-title'>Title</h1>
      </div>
    </div>
  );
}

export default NoteHeader;