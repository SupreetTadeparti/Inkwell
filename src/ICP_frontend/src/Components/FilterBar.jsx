import { ICP_backend } from "../../../declarations/ICP_backend";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import CategoryTab from "./CategoryTab";
import SearchBar from "./SearchBar";

function FilterBar({ allNotes, setNotes }) {
    const [categories, setCategories] = useState([
        { name: "All", color: "#ffffff", isSelected: true },
        { name: "Journal", color: "#ff6a6a", isSelected: false },
        { name: "Philosophy", color: "#53e86b", isSelected: false },
        { name: "Work", color: "#278bff", isSelected: false }
    ]);

    const [selectedIdx, setSelectedIdx] = useState([]);

    const { actor } = useAuth();

    async function getCategories() {
        setCategories(await (actor ?? ICP_backend).getCategories())
    }

    async function createCategory() {
        await (actor ?? ICP_backend).createCategory('New Category', `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
        getCategories();
    }

    useEffect(() => {
        getCategories();
    }, [])

    return <div className="filter-bar glass">
        <div className="search-bar-container">
            <SearchBar />
        </div>
        <div className="categories-container">
            {categories.map((category, idx) => <CategoryTab
                name={category.name}
                color={category.color}
                isSelected={selectedIdx == idx}
                onClick={() => {
                    setSelectedIdx(idx);
                    setNotes(allNotes.filter(() => note.category.id === category.id))
                }}
            />)}
            <div className="create-category" onClick={createCategory}>+</div>
        </div>
    </div>
}

export default FilterBar;