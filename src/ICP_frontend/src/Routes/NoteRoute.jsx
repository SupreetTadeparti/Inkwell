import { ICP_backend } from "../../../declarations/ICP_backend";
import "../assets/css/NoteRoute.css"
import NoteHeader from "../Components/NoteHeader";
import NoteEditor from "../Components/NoteEditor";

function NoteRoute() {
    return (
        <div className="note-container">
            <div className="background"></div>
            <NoteHeader />
            <NoteEditor />
        </div>
    );
}

export default NoteRoute;