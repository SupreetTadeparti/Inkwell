

const CategoryTab = ({ name, color, isSelected }) => {
    return (
        <div className={`tab ${isSelected ? 'selected' : ''}`}>
            <div className="circle" style={{ backgroundColor: color }}></div>
            <div className="category-name">{name}</div>
        </div>
    );
};

export default CategoryTab;