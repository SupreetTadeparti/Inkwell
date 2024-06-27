import { useState } from "react";
import { useAuth } from "../AuthContext";
import { ICP_backend } from "../../../declarations/ICP_backend";

function NewNoteButton() {
    const { actor } = useAuth();

    return <div className="new-note-btn glass" onClick={async () => {
        await (actor ?? ICP_backend).createNote();
    }}>+</div>
}

export default NewNoteButton