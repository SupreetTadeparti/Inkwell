const CategoryTab = ({ name, color, isSelected, click }) => {
    return (
        <div className={`tab ${isSelected ? 'selected' : ''}`} onClick={click}>
            <div className="circle" style={{ backgroundColor: color }}></div>
            <div className="category-name">{name}</div>
        </div>
    );
};

export default CategoryTab;