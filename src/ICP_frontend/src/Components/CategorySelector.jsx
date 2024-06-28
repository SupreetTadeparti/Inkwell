import React from 'react';
import { useState } from 'react';

const CategorySelector = ({note, setNote}) => {
    const [mode, setMode] = useState(true);

  return (
    mode ? (
    <div
        className="category-name"
        onDoubleClick={() => setMode(false)}
        style={{
        backgroundColor:
            note.category.length === 0 ? "white" : note.category.color,
        color: note.category.length === 0 ? "black" : "white",
        }}
    >
        {note.category.length === 0 ? "All" : note.category.name}
    </div>
    ) : (
    <div id="select-box"
    onKeyDown={(e) => {
        if (e.key === "Escape") {
          setMode(true);
          return;
        }
      }}>
        <input type="checkbox" id="options-view-button" />
        <div id="select-button" class="brd">
          <div id="selected-value">
            <span>Select a platform</span>
          </div>
          <div id="chevrons">
            <i class="fas fa-chevron-up"></i>
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
        <div id="options">
          <div class="option">
            <input class="s-c top" type="radio" name="platform" value="codepen"/>
            <input class="s-c bottom" type="radio" name="platform" value="codepen"/>
            <i class="fab fa-codepen"></i>
            <span class="label">CodePen</span>
            <span class="opt-val">CodePen</span>
          </div>
          <div id="option-bg"></div>
        </div>
    </div>
    )
  );
}

export default CategorySelector;