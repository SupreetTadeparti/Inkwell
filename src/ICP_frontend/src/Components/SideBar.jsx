import logo from "../assets/img/logo.png";
import NewNoteButton from "./NewNoteButton";
import exitIcon from "../assets/img/exit.svg";
import { useAuth } from "../AuthContext";
import copyIcon from "../assets/img/copy.svg";
import { useState, useEffect } from "react";
import { notify } from "../util";

function SideBar() {
  const { logout, authenticated, getActor } = useAuth();
  const [shareId, setShareId] = useState("...");

  useEffect(() => {
    if (authenticated === null) return;

    (async () => {
      const res = await (await getActor()).generateShareId();
      setShareId(res);
    })();
  }, [authenticated]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareId)
      .then(() => {
        notify("Copied to Clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="side-bar glass">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <NewNoteButton />
      <div className="side-bar__bottom">
        <div className="share-id">
          <div className="share-id-text">
            Share ID: {typeof shareId === "string" ? shareId : Number(shareId)}
          </div>
          <div className="copy-icon" onClick={copyToClipboard}>
            <img src={copyIcon} alt="Copy" />
          </div>
        </div>
        <div className="logout-btn glass button" onClick={logout}>
          <div className="logout-btn__icon">
            <img src={exitIcon} alt="Logout" />
          </div>
          <div className="logout-btn__text">Logout</div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
