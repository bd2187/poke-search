import React from "react";
import { Link } from "react-router-dom";
import prependZeroes from "../../utils/prependZeroes";
import getPokemonID from "../../utils/getPokemonID";

const PokemonThumbnail = function({ pokemon }) {
    var id = prependZeroes(getPokemonID(pokemon.url));
    var imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
    return (
        <li>
            <img alt={pokemon.name} src={imageURL} />
            {pokemon.name}
        </li>
    );
};

export default PokemonThumbnail;
