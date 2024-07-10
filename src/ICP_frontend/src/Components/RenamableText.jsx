import { useEffect, useState, useRef } from "react";

function RenamableText({ content, onSave, minLength, maxLength }) {
  // false: Text
  // true: Input
  const [text, setText] = useState(content);
  const [mode, setMode] = useState(true);
  const [inputWidth, setInputWidth] = useState(10);
  const hiddenSpanRef = useRef(null);
  const inputRef = useRef(null);

  // Function to calculate and set the input width
  const calculateInputWidth = () => {
    if (hiddenSpanRef.current) {
      const newWidth = hiddenSpanRef.current.offsetWidth + 10; // Add some padding
      setInputWidth(newWidth);
    }
  };

  // Update the input width when text changes
  useEffect(() => {
    calculateInputWidth();
  }, [text, mode]);

  // Set initial input width when component mounts
  useEffect(() => {
    calculateInputWidth();
  }, []);

  useEffect(() => setText(content), [content]);

  return mode ? (
    <div
      className="text"
      onDoubleClick={() => {
        setMode(false);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 500);
      }}
    >
      {text}
    </div>
  ) : (
    <>
      <input
        className="renamable-input"
        type="text"
        ref={inputRef}
        value={text}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setMode(true);
            onSave(text);
            return;
          }
          if (e.key === "Escape") {
            setMode(true);
            return;
          }
        }}
        onBlur={() => {
          setMode(true);
          onSave(text);
          return;
        }}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        minLength={minLength}
        style={{ width: `${inputWidth}px` }}
      />
      <span ref={hiddenSpanRef} className="hidden-span">
        {text || " "}
      </span>
    </>
  );
}

export default RenamableText;
