/**
 *  Extracts pokemon ID from pokemon URL (i.e https://pokeapi.co/api/v2/pokemon/91/)
 *  @param String url
 *  @return Number (i.e 91)
 */
const getPokemonID = function(url) {
    var indexOfSubStr = url.indexOf("/pokemon/");
    var str = url.slice(indexOfSubStr, url.length);

    var id = parseInt(str.replace(/pokemon/g, "").replace(/\//g, ""));

    return parseInt(id);
};

export default getPokemonID;
