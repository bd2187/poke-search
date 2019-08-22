import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { render } from "react-dom";

import Loading from "./components/Loading";
import PokemonList from "./components/PokemonList";
import Search from "./components/Search";

const App = function() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [queriedData, setQueriedData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState(false);

    const updateSearchValue = function updateSearchValue(value) {
        setSearchValue(value);

        const lowerCasedQuery = value.toLowerCase().trim();
        if (lowerCasedQuery === "") {
            // display all pokemon
            setQueriedData(data);
        } else {
            // filter through data and display results based on searchValue
            const results = data.filter(function(pokemon) {
                if (!pokemon.name) return;
                const pokemon_name = pokemon.name.toLowerCase();

                if (pokemon_name.includes(lowerCasedQuery)) return pokemon;
            });

            setQueriedData(results);
        }
    };

    useEffect(function() {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                setTimeout(function() {
                    setData(data.results);
                    setQueriedData(data.results);
                    setLoading(false);
                }, 2000);
            })
            .catch(function(err) {
                console.log(err);
            });
    }, []);

    return (
        <Router>
            <div className="">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Search
                            searchValue={searchValue}
                            updateSearchValue={updateSearchValue}
                        />
                        <PokemonList pokemon_arr={queriedData} />
                    </>
                )}
            </div>
        </Router>
    );
};

render(<App />, document.getElementById("root"));
