import React, { useState, useEffect } from "react";
import PokemonThumbnail from "../PokemonThumbnail/PokemonThumbnail";
import { List } from "./PokemonList_styles";

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

    componentDidUpdate(prevProps) {
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

    componentWillUnmount() {
        window.onscroll = null;
    }

    componentDidMount() {
        if (this.props.pokemon.length > 0) {
            this.setState({
                offset: 50,
                pokemonToDisplay: [...this.props.pokemon.slice(0, 50)]
            });
        }

        window.onscroll = () => {
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
                <List>
                    {this.state.pokemonToDisplay.map(pokemon => {
                        return (
                            <PokemonThumbnail
                                key={pokemon.name}
                                pokemon={pokemon}
                            />
                        );
                    })}
                </List>
            );
        }
    }
}

export default PokemonList;
