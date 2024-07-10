import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { notify } from "../util";

const SharePopup = ({ noteId, onClose }) => {
  const [shareId, setShareId] = useState("");
  const [accessLevel, setAccessLevel] = useState("ReadOnly");
  const { getActor } = useAuth();

  const handleShare = async () => {
    const actor = await getActor();
    const res = await actor.shareNote(noteId, Number(shareId), { [accessLevel]: null });
    if ("Failure" in res) notify(res.Failure);
    else {
      notify("Note shared successfully!");
      onClose();
    }
  };

  return (
    <div className="share-popup-overlay">
      <div className="share-popup-content">
        <h2>Share Note</h2>
        <input
          type="text"
          value={shareId}
          onChange={(e) => setShareId(e.target.value)}
          placeholder="Enter share ID"
        />
        <select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value)}
        >
          <option value="ReadOnly">Read Only</option>
          <option value="ReadWrite">Read & Write</option>
        </select>
        <div className="share-popup-buttons">
          <button onClick={handleShare}>Share</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;