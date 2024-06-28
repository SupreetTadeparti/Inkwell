import { ICP_backend } from "../../../declarations/ICP_backend";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import CategoryTab from "./CategoryTab";
import SearchBar from "./SearchBar";

function FilterBar({ allNotes, setNotes }) {
    const [categories, setCategories] = useState([]);

    const [selectedIdx, setSelectedIdx] = useState(0);

    const { actor } = useAuth();

    async function getCategories() {
        setCategories([{ name: "All", color: "white", all: true }, ...(await (actor ?? ICP_backend).getCategories())])
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
                key={idx}
                id={category.id}
                name={category.name}
                color={category.color}
                isSelected={selectedIdx === idx}
                renamable={category.all !== true}
                click={() => {
                    setSelectedIdx(idx);
                    setNotes(allNotes.filter((note) => category.all || note.category.id === category.id))
                }}
            />)}
            <div className="create-category" onClick={createCategory}>+</div>
        </div>
    </div>
}

export default FilterBar;