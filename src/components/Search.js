import React, { useState } from "react";

const Search = function() {
    const [inputValue, setInputValue] = useState("");

    const updateSearchValue = function updateSearchValue(ev) {
        setInputValue(ev.target.value);
    };

    return (
        <form>
            <input
                value={inputValue}
                type="text"
                onChange={updateSearchValue}
            />
        </form>
    );
};

export default Search;
