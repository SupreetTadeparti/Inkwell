import { useAuth } from "../AuthContext";
import { ICP_backend } from "../../../declarations/ICP_backend";
import { useNavigate } from "react-router-dom";


function NewNoteButton() {
    const { actor } = useAuth();
    const navigate = useNavigate();

    return <div className="new-note-btn glass" onClick={async () => {
        const noteId = await (actor ?? ICP_backend).createNote("New Note", "", []);
        navigate(`/note?canisterId=${process.env.CANISTER_ID}&${noteId}`);
    }}>+</div>
}

export default NewNoteButton