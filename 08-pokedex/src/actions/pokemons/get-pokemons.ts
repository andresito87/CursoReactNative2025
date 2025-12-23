import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {
    try {
        const offset = page * limit;
        const url = `/pokemon?offset=${offset}&limit=${limit}`;
        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

        const pokemonPromises = data.results.map(info => pokeApi.get<PokeAPIPokemon>(info.url));
        const pokeApiPokemons = await Promise.all(pokemonPromises);

        return pokeApiPokemons.map(item => PokemonMapper.pokeApiPokemonToEntity(item.data));
    } catch (error) {
        throw new Error(`Error getting pokemons ${error}`);
    }
};
