import React, { useState, useEffect } from "react";
import prependZeroes from "../../utils/prependZeroes";
import getPokemonID from "../../utils/getPokemonID";

const gatherEvolutionChain = function(evolutionObject, evolutionArray) {
    if (evolutionObject.evolves_to.length > 0) {
        let pokemonEvolution = {
            name: evolutionObject.evolves_to[0].species.name,
            id: getPokemonID(
                evolutionObject.evolves_to[0].species.url.replace(
                    "-species",
                    ""
                )
            )
        };

        evolutionArray = [...evolutionArray, pokemonEvolution];

        return gatherEvolutionChain(
            evolutionObject.evolves_to[0],
            evolutionArray
        );
    } else {
        return evolutionArray;
    }
};

const Pokemon = function({ match }) {
    const [state, setState] = useState({
        loading: true,
        error: false,
        data: {}
    });

    const [evolutionChain, setEvolutionChain] = useState({
        loading: true,
        error: false,
        data: []
    });

    useEffect(function() {
        fetch(
            `https://pokeapi.co/api/v2/pokemon/${decodeURIComponent(
                match.params.name
            )}`
        )
            .then(res => res.json())
            .then(res => {
                setState({
                    loading: false,
                    error: false,
                    data: res
                });

                console.warn(res.id);
                return fetch(
                    `https://pokeapi.co/api/v2/evolution-chain/${res.id}`
                );
            })
            .then(res => res.json())
            .then(res => {
                setEvolutionChain({
                    loading: false,
                    error: false,
                    data: gatherEvolutionChain(res.chain, [])
                });
            })
            .catch(err => {
                console.error(err);
                setState({
                    loading: false,
                    error: true
                });
            });
    }, []);

    {
        let { loading, error, data } = state;

        if (loading) {
            return <p>loading</p>;
        } else if (error) {
            return <p>error</p>;
        } else {
            let name = `${data.name[0].toUpperCase()}${data.name.slice(
                1,
                data.name.length
            )}`;

            let imgSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${prependZeroes(
                data.id
            )}.png`;

            let stats = data.stats || [];
            let types = data.types || [];
            let weight = data.weight || "unknown";
            let { data: chain } = evolutionChain;
            return (
                <div>
                    <h1>{name}</h1>
                    <img src={imgSrc} alt={name} />

                    <h2>stats</h2>
                    <ul>
                        {stats.map(({ stat, base_stat }) => {
                            return (
                                <li key={stat.name}>
                                    {stat.name} - {base_stat}
                                </li>
                            );
                        })}
                    </ul>

                    <h2>{types.length > 1 ? "Types" : "Type"}</h2>
                    <ul>
                        {types.map(({ type }) => {
                            return <li key={type.name}>{type.name}</li>;
                        })}
                    </ul>

                    <h2>Weight</h2>
                    <p>{weight} lbs.</p>

                    {/* todo: fix chain */}
                    {/* {chain.length > 0 ? (
                        <>
                            <h2>Evolutions</h2>
                            <ul>
                                {chain.map(({ name, id }) => {
                                    let imgPath = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${prependZeroes(
                                        id
                                    )}.png`;

                                    return (
                                        <li key={name}>
                                            <p>{name}</p>
                                            <img alt={name} src={imgPath} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : null} */}
                </div>
            );
        }
    }
};

export default Pokemon;
