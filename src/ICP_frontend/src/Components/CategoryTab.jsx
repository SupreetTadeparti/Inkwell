import RenamableText from "./RenamableText";
import { useAuth } from "../AuthContext";
import { ICP_backend } from "../../../declarations/ICP_backend";

const CategoryTab = ({ id, name, color, isSelected, renamable, click }) => {
  const { actor } = useAuth();

  return (
    <div className={`tab ${isSelected ? "selected" : ""}`} onClick={click}>
      <div className="circle" style={{ backgroundColor: color }}></div>
      <div className="category-name">
        {renamable ? (
          <RenamableText
            content={name}
            minLength={1}
            maxLength={15}
            onSave={async (text) => {
              await (actor || ICP_backend).updateCategory(id, text, color);
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
