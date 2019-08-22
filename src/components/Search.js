import React, { useState } from "react";

const Search = function({ searchValue, updateSearchValue }) {
    return (
        <form>
            <input
                value={searchValue}
                type="text"
                onChange={ev => updateSearchValue(ev.target.value)}
            />
        </form>
    );
};

export default Search;
