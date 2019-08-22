import React from "react";
const PokemonList = function({ pokemon_arr }) {
    return (
        <ul>
            {pokemon_arr.length > 0
                ? pokemon_arr.map(function(pokemon_obj) {
                      var indexOfSubStr = pokemon_obj.url.indexOf("/pokemon/");
                      var str = pokemon_obj.url.slice(
                          indexOfSubStr,
                          pokemon_obj.url.length
                      );
                      var id = parseInt(
                          str.replace(/pokemon/g, "").replace(/\//g, "")
                      );

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
                  })
                : null}
        </ul>
    );
};

export default PokemonList;
