import React from "react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";

const CategorySelector = ({ note, setNote }) => {
  const allCategory = { name: "All", color: "#ffffff", id: -1, all: true };
  const [mode, setMode] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { getActor } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(
    note.category.length === 0 ? allCategory : note.category[0]
  );
  const containerRef = useRef(null);

  useEffect(() => {
    if (note.category.length !== 0) {
      setSelectedCategory(note.category[0]);
    }
  }, [note]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    if (category.id === -1) {
      category = [];
    }
    setNote({ ...note, category: [category] });
    setMode(true); // Close the dropdown and switch back to display mode
  };

  useEffect(() => {
    (async () => {
      try {
        const fetchedCategories = await (await getActor()).getCategories();
        setCategories([allCategory, ...fetchedCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([allCategory]); // Fallback to default
      }
    })();
  }, []);

  return (
    <div
      className="category-name custom-select-container"
      ref={containerRef}
      style={{
        "--clr": selectedCategory.color,
        backgroundColor: selectedCategory.color,
      }}
    >
      <div
        className="selected-value"
        onClick={toggleDropdown}
        style={{
          color: selectedCategory.color === "#ffffff" ? "black" : "#ffffff",
        }}
      >
        {selectedCategory.name}
      </div>
      {isOpen && (
        <div className="options-list">
          {categories.map((category) => (
            <div
              key={category.id}
              className="option"
              onClick={() => handleSelect(category)}
            >
              <div
                className="circle"
                style={{
                  backgroundColor: category.color,
                }}
              ></div>
              <div className="option-name">{category.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
