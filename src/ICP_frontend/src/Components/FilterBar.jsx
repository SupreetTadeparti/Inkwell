import { ICP_backend } from "../../../declarations/ICP_backend";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../AuthContext";
import CategoryTab from "./CategoryTab";
import SearchBar from "./SearchBar";

function FilterBar({ allNotes, setNotes, setSearchText }) {
  const [isRightVisible, setIsRightVisible] = useState(true);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [categories, setCategories] = useState([]);
  const scrollContainerRef = useRef(null);
  const { actor } = useAuth();

  async function getCategories() {
    setCategories([
      { name: "All", color: "white", all: true },
      ...(await (actor ?? ICP_backend).getCategories()),
    ]);
  }

  async function createCategory() {
    await (actor ?? ICP_backend).createCategory(
      "New Category",
      `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)})`
    );
    getCategories();
  }

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setIsLeftVisible(container.scrollLeft > 0);
      setIsRightVisible(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 200;
    if (container) {
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
      setTimeout(checkScrollPosition, 300);
    }
  };

  useEffect(() => {
    getCategories();
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, []);

  return (
    <div className="filter-bar glass">
      <div className="search-bar-container">
        <SearchBar setSearchText={setSearchText} />
      </div>
      <div className="categories-container">
        <div className="categories">
          <button
            className={`categories__left-arrow ${
              !isLeftVisible ? "hidden" : ""
            }`}
            onClick={() => scroll("left")}
          >
            &lt;
          </button>
          <div className="categories__main" ref={scrollContainerRef}>
            {categories.map((category, idx) => (
              <CategoryTab
                key={idx}
                id={category.id}
                name={category.name}
                color={category.color}
                isSelected={selectedIdx === idx}
                renamable={category.all !== true}
                click={() => {
                  setSelectedIdx(idx);
                  setNotes(
                    allNotes.filter(
                      (note) => category.all || note.category.id === category.id
                    )
                  );
                }}
              />
            ))}
            <div className="create-category button" onClick={createCategory}>
              +
            </div>
          </div>
          <button
            className={`categories__right-arrow ${
              !isRightVisible ? "hidden" : ""
            }`}
            onClick={() => scroll("right")}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
