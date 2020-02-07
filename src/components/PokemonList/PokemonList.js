import React, { useState, useEffect } from "react";

const PokemonList = ({ match }) => {
    const [state, setState] = useState({
        loading: true,
        error: false,
        pokemon: [],
        offset: 0
    });

    const fetchPokemon = function() {
        var endpoint = "";
        {
            let limit =
                parseInt(match.params.offset) > 50
                    ? parseInt(match.params.offset)
                    : 50;

            var endpoint =
                parseInt(match.params.offset) > 0 && state.offset === 0
                    ? `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
                    : `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${state.offset}`;
        }

        fetch(endpoint)
            .then(res => res.json)
            .then(data =>
                setState({
                    loading: false,
                    pokemon: [...state.pokemon, ...data.results],
                    offset: state.offset + 50
                })
            )
            .catch(() => setState({ loading: false, error: true }));
    };

    useEffect(function() {
        fetchPokemon();

        window.onscroll = function(ev) {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                console.warn("bottom");
            }
        };

        return () => {
            window.onscroll = null;
        };
    }, []);

    return null;
};

export default PokemonList;
