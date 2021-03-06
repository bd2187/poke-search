import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav } from "./Navigation_styles";

const Navigation = function({ history }) {
    const [state, setState] = useState({
        searchValue: "",
        redirect: false
    });

    const onChange = evt => setState({ searchValue: evt.target.value });
    const onSubmit = evt => {
        evt.preventDefault();

        if (state.searchValue.trim() === "") return;

        var encodedSearchValue = encodeURIComponent(
            state.searchValue
        ).toLowerCase();

        history.push(`/search/${encodedSearchValue}`);
    };

    return (
        <Nav>
            <h1>
                <Link to="/">Logo</Link>
            </h1>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Search Pokemon"
                    onChange={onChange}
                    value={state.searchValue}
                />
                <input type="Submit" value="Submit" readOnly />
            </form>
        </Nav>
    );
};

export default withRouter(Navigation);
