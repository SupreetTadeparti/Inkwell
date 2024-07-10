import { useEffect, useState, useRef } from "react";
import backImg from "../assets/img/back.svg";
import { useAuth } from "../AuthContext";
import CategoryTab from "./CategoryTab";
import SearchBar from "./SearchBar";

function FilterBar({ allNotes, setNotes, setSearchText }) {
  const [isRightVisible, setIsRightVisible] = useState(true);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [categories, setCategories] = useState([]);
  const scrollContainerRef = useRef(null);
  const { authClient, getActor } = useAuth();

  const generateRandomHexColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

  async function getCategories() {
    setCategories([
      { name: "All", color: "#ffffff", all: true },
      { name: "Shared", color: "#000000", shared: true },
      ...(await (await getActor()).getCategories()),
    ]);
    checkScrollPosition();
  }

  async function createCategory() {
    await (
      await getActor()
    ).createCategory("New Category", generateRandomHexColor());
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
      setTimeout(checkScrollPosition, 800);
    }
  };

  const isOwner = (note) => {
    return (
      JSON.stringify(note.owner) ===
      JSON.stringify(authClient.getIdentity().getPrincipal())
    );
  };

  useEffect(() => {
    getCategories();
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
            className={`categories__arrow ${!isLeftVisible ? "hidden" : ""}`}
            onClick={() => scroll("left")}
          >
            <img src={backImg} alt="back button" />
          </button>
          <div className="categories__main" ref={scrollContainerRef}>
            {categories.map((category, idx) => (
              <CategoryTab
                key={idx}
                id={category.id}
                name={category.name}
                clr={category.color}
                isSelected={selectedIdx === idx}
                changable={category.all !== true && category.shared !== true}
                click={() => {
                  setSelectedIdx(idx);
                  setNotes(
                    allNotes.filter(
                      (note) =>
                        category.all ||
                        (category.shared && !isOwner(note)) ||
                        (note.category.length > 0 &&
                          note.category[0].id === category.id)
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
            className={`categories__arrow right ${
              !isRightVisible ? "hidden" : ""
            }`}
            onClick={() => scroll("right")}
          >
            <img src={backImg} alt="next button" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
