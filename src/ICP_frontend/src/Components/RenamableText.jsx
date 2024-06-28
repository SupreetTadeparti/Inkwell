import { useEffect, useState } from "react";

function RenamableText({ content, onSave, minLength, maxLength }) {
    // false: Text
    // true: Input
    const [text, setText] = useState(content);
    const [mode, setMode] = useState(true);

    useEffect(() => setText(content), [content])

    return mode ? <div className="text" onDoubleClick={() => setMode(false)}>{text}</div>
        : <input className="renamable-input" type="text" value={text} onKeyDown={(e) => {
            if (e.key === "Enter") {
                setMode(true);
                onSave(text);
                return;
            }
        }} onChange={(e) => setText(e.target.value)} placeholder="Category Name..." maxLength={maxLength} minLength={minLength} />
}

export default RenamableText;