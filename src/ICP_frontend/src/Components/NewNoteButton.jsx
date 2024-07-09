import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function NewNoteButton() {
  const { getActor } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="new-note-btn button glass"
      onClick={async () => {
        const noteId = await (await getActor()).createNote("New Note", "", []);
        navigate(`/note?canisterId=${process.env.CANISTER_ID}&id=${noteId}`);
      }}
    >
      +
    </div>
  );
}

export default NewNoteButton;
