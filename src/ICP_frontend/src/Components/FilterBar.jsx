import { useState } from "react";
import CategoryTab from "./CategoryTab";
import SearchBar from "./SearchBar";

function FilterBar() {
    const [categories, setCategories] = useState([
        { name: "All", color: "#ffffff", isSelected: true },
        { name: "Journal", color: "#ff6a6a", isSelected: false },
        { name: "Philosophy", color: "#53e86b", isSelected: false },
        { name: "Work", color: "#278bff", isSelected: false }
    ]);

    return <div className="filter-bar glass">
        <div className="search-bar-container">
            <SearchBar />
        </div>
        <div className="categories-container">
            {categories.map(category => <CategoryTab name={category.name} color={category.color} isSelected={category.isSelected} />)}
        </div>
    </div>
}

export default FilterBar;