import React, { useState, useEffect } from "react";
import PokemonThumbnail from "../PokemonThumbnail/PokemonThumbnail";

class PokemonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 50,
            pokemonToDisplay: []
        };
    }

    filterPokemon(query) {
        var filteredPokemon = this.props.pokemon.filter(pokemon => {
            return pokemon.name.includes(query);
        });

        return filteredPokemon;
    }

    componentDidUpdate(prevProps, prevState) {
        const query = this.props.match.params.query;
        if (prevProps.pokemon.length !== this.props.pokemon.length) {
            if (query) {
                this.setState({
                    pokemonToDisplay: this.filterPokemon(query)
                });
            } else {
                this.setState({
                    offset: 50,
                    pokemonToDisplay: [...this.props.pokemon.slice(0, 50)]
                });
            }
        }

        if (prevProps.match.params.query !== this.props.match.params.query) {
            if (query) {
                this.setState({
                    pokemonToDisplay: this.filterPokemon(query)
                });
            } else {
                this.setState({
                    pokemonToDisplay: [
                        ...this.props.pokemon.slice(0, this.state.offset)
                    ]
                });
            }
        }
    }

    componentDidMount() {
        window.onscroll = ev => {
            var doc = document.getElementsByTagName("html")[0];
            var windowOffset = doc.scrollTop + window.innerHeight;
            var height = doc.offsetHeight;
            if (windowOffset === height && !this.props.match.params.query) {
                var updatedOffset = this.state.offset + 50;
                this.setState({
                    offset: updatedOffset,
                    pokemonToDisplay: [
                        ...this.state.pokemonToDisplay,
                        ...this.props.pokemon.slice(
                            this.state.offset,
                            updatedOffset
                        )
                    ]
                });
            }
        };
    }

    render() {
        if (this.props.loading) {
            return <p>loading...</p>;
        } else if (this.props.error) {
            return <p>error</p>;
        } else if (this.state.pokemonToDisplay.length === 0) {
            return <p>no results found</p>;
        } else {
            return (
                <ul>
                    {this.state.pokemonToDisplay.map(pokemon => {
                        return (
                            <PokemonThumbnail
                                key={pokemon.name}
                                pokemon={pokemon}
                            />
                        );
                    })}
                </ul>
            );
        }
    }
}

export default PokemonList;
