import searchIcon from "../assets/img/search.svg"

function SearchBar() {
    return (
        <div className="search-bar glass">
            <div className="search-bar__icon"><img src={searchIcon} alt="search icon" /></div>
            <input type="text" className="search-bar__input" title="Search" placeholder="Search..." />
        </div>
    );
}

export default SearchBar;