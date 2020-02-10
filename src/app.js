import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { render } from "react-dom";

import PokemonList from "./components/PokemonList/PokemonList";
import Navigation from "./components/Navigaton/Navigation";
import Pokemon from "./components/Pokemon/Pokemon";

const App = function() {
    const [state, setState] = useState({
        pokemon: [],
        loading: true,
        error: false
    });

    useEffect(function() {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
            .then(res => res.json())
            .then(res => {
                setState({
                    pokemon: res.results,
                    loading: false,
                    error: false
                });
            })
            .catch(err => {
                console.error(err);
                setState({ error: true, loading: false });
            });
    }, []);

    return (
        <Router>
            <Navigation />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={props => {
                        return (
                            <PokemonList
                                {...props}
                                pokemon={state.pokemon}
                                loading={state.loading}
                                error={state.error}
                            />
                        );
                    }}
                />

                <Route
                    exact
                    path="/search/:query"
                    render={props => {
                        return (
                            <PokemonList
                                {...props}
                                pokemon={state.pokemon}
                                loading={state.loading}
                                error={state.error}
                            />
                        );
                    }}
                />

                <Route exact path="/pokemon/:name" component={Pokemon} />
            </Switch>
        </Router>
    );
};

render(<App />, document.getElementById("root"));
