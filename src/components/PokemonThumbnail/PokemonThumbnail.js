import React from "react";
import { Link } from "react-router-dom";
import prependZeroes from "../../utils/prependZeroes";
import getPokemonID from "../../utils/getPokemonID";
import { Thumbnail } from "./PokemonThumbnail_styles";

const PokemonThumbnail = function({ pokemon }) {
    var id = prependZeroes(getPokemonID(pokemon.url));
    var imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
    return (
        <Thumbnail>
            <Link to={`/pokemon/${pokemon.name}`}>
                <img
                    alt={pokemon.name}
                    src={imageURL}
                    width="200"
                    height="200"
                />
                <h1>{pokemon.name}</h1>
            </Link>
        </Thumbnail>
    );
};

export default PokemonThumbnail;
