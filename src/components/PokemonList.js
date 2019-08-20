import React from "react";
const PokemonList = function({ pokemon_arr }) {
    return (
        <ul>
            {pokemon_arr.map(function(pokemon_obj, index) {
                var id = ++index;
                var image_ext;
                if (id <= 9) {
                    image_ext = `00${id}`;
                } else if (id >= 10 && id <= 99) {
                    image_ext = `0${id}`;
                } else {
                    image_ext = id;
                }

                var image_src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${image_ext}.png`;

                return (
                    <li key={`${pokemon_obj.name}__${id}`}>
                        <p>{pokemon_obj.name}</p>
                        <img src={image_src} />
                    </li>
                );
            })}
        </ul>
    );
};

export default PokemonList;
