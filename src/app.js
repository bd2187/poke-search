import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { render } from "react-dom";

import Loading from "./components/Loading";
import PokemonList from "./components/PokemonList";
import Search from "./components/Search";

const App = function() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(function() {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                setTimeout(function() {
                    setData(data.results);
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
                {loading ? <Loading /> : null}
                {data.length > 0 ? (
                    <>
                        <Search />
                        <PokemonList pokemon_arr={data} />
                    </>
                ) : null}
            </div>
        </Router>
    );
};

render(<App />, document.getElementById("root"));
