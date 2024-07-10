import React from "react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const CategorySelector = ({ note, setNote, isOwner }) => {
  const allCategory = { name: "All", color: "#ffffff", id: -1, all: true };
  const sharedCategory = {
    name: "Shared",
    color: "#000000",
    id: -1,
    shared: true,
  };
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { authenticated, getActor } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(
    note.category.length === 0 ? allCategory : note.category[0]
  );
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated !== null && !isOwner) setSelectedCategory(sharedCategory);
    else if (note.category.length !== 0) {
      setSelectedCategory(note.category[0]);
    } else {
      setSelectedCategory(allCategory);
    }
  }, [note, isOwner]);

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
    if (!isOwner) return;
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    if (category.id === -1) {
      category = [];
    }
    setNote({ ...note, category: [category] });
  };

  useEffect(() => {
    if (authenticated === null) return;

    if (authenticated === false)
      return navigate(`/?canisterId=${process.env.CANISTER_ID}`);

    (async () => {
      try {
        const fetchedCategories = await (await getActor()).getCategories();
        setCategories([allCategory, ...fetchedCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([allCategory]); // Fallback to default
      }
    })();
  }, [authenticated]);

  return (
    <div
      className="custom-select-container"
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
