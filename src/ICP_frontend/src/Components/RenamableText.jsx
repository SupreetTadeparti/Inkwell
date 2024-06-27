import { useState } from "react";

function RenamableText({ content, onSave }) {
    // false: Text
    // true: Input
    const [text, setText] = useState(content);
    const [mode, setMode] = useState(false);

    return mode ?
        <div className="text" onDoubleClick={() => setMode(true)}>{content}</div> :
        <input type="text" value={text} onChange={e => {
            setText(e.target.value);
            if (e.key === "Enter") {
                setMode(false);
                onSave();
            }
        }} placeholder="Category Name..." minLength={1} />
}

export default RenamableText;