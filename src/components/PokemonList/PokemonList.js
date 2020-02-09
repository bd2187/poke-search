import React, { useState, useEffect } from "react";

class PokemonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            pokemon: [],
            offset: 0
        };
    }

    /**
     * Calls fetchPokemon to render pokemon to DOM.
     * Adds scroll event listener to check if user
     * scrolled to bottom of webpage
     */
    componentDidMount() {
        this.fetchPokemon(this.props.match.params.offset);

        window.onscroll = ev => {
            var doc = document.getElementsByTagName("html")[0];
            var offset = doc.scrollTop + window.innerHeight;
            var height = doc.offsetHeight;

            if (offset === height) {
                this.setState(state => {
                    return { offset: state.offset + 50, loading: true };
                });
            }
        };
    }
    /**
     * Removes scroll event listener
     */
    componentWillUnmount() {
        window.onscroll = null;
    }

    /**
     * Calls fetchPokemon whenever this.state.offset is updated
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState.offset !== this.state.offset) {
            this.fetchPokemon(this.state.offset);
        }
    }

    /**
     *
     * @param Number offset
     * @return
     */
    fetchPokemon(offset) {
        var endpoint = "";

        let limit = parseInt(offset) > 50 ? parseInt(offset) : 50;

        var endpoint =
            parseInt(offset) > 0 && this.state.offset === 0
                ? `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
                : `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${this.state.offset}`;

        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    loading: false,
                    pokemon: [...this.state.pokemon, ...data.results],
                    offset: limit
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false, error: true });
            });
    }

    render() {
        return (
            <ul>
                {this.state.pokemon.map(pokemon => {
                    return <li key={pokemon.name}>{pokemon.name}</li>;
                })}
            </ul>
        );
    }
}

export default PokemonList;
