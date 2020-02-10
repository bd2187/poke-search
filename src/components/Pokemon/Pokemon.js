import React, { useState, useEffect } from "react";

const Pokemon = function({ match }) {
    const [state, setState] = useState({
        loading: true,
        error: false,
        data: {}
    });

    useEffect(function() {
        fetch(
            `https://pokeapi.co/api/v2/pokemon/${decodeURIComponent(
                match.params.name
            )}`
        )
            .then(res => res.json())
            .then(res => {
                setState({
                    loading: false,
                    error: false,
                    data: res
                });
            })
            .catch(err => {
                console.error(err);
                setState({
                    loading: false,
                    error: true
                });
            });
    }, []);

    return <h1>test</h1>;
};

export default Pokemon;
