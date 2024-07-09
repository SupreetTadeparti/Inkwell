import NoteHeader from "../Components/NoteHeader";
import NoteEditor from "../Components/NoteEditor";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import "../assets/css/NoteRoute.css";

function NoteRoute() {
  const [note, setNote] = useState({
    title: "Loading...",
    content: "Loading...",
    category: [],
  });
  const [searchParams] = useSearchParams();
  const { getActor } = useAuth();
  const navigate = useNavigate();

  const initializeNote = async () => {
    const targetNote = await (
      await getActor()
    ).getNote(+searchParams.get("id"));
    if (targetNote.length === 0) {
      navigate(`/app?canisterId=${process.env.CANISTER_ID}`);
      return;
    }
    setNote(targetNote[0]);
  };

  useEffect(() => {
    initializeNote();
  }, []);

  return (
    <div className="note-container">
      <div className="background"></div>
      <NoteHeader note={note} setNote={setNote} />
      <NoteEditor note={note} setNote={setNote} />
      <div className="footer">{note.id}</div>
    </div>
  );
}

export default NoteRoute;
