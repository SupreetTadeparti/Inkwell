import RenamableText from "./RenamableText";
import { useAuth } from "../AuthContext";
import { useState } from "react";

const CategoryTab = ({ id, name, clr, isSelected, changable, click }) => {
  const { getActor } = useAuth();
  const [color, setColor] = useState(clr);

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const saveColor = async (e) => {
    await (await getActor()).updateCategory(id, name, color);
  };

  return (
    <div className={`tab ${isSelected ? "selected" : ""}`} onClick={click}>
      <div className="circle">
        <input
          className="circle-input"
          type="color"
          onChange={handleColor}
          onFocus={saveColor}
          value={color}
          disabled={!changable}
        />
      </div>
      <div className="category-name">
        {changable ? (
          <RenamableText
            content={name}
            minLength={1}
            maxLength={15}
            onSave={async (text) => {
              await (await getActor()).updateCategory(id, text, color);
            }}
          />
        ) : (
          name
        )}
      </div>
    </div>
  );
};

export default CategoryTab;
