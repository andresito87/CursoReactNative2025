import { FlatList, ListRenderItem, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalTheme } from '../../../config/theme/global-theme';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { useCallback, useMemo, useState } from 'react';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId, getPokemonsByIds } from '../../../actions/pokemons';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const [term, setTerm] = useState('');

    // custom hook para controlar el retardo o debounce en la petición a la API unos milisegundos despues de que el usuario deja de escribir
    const debouncedValue = useDebouncedValue(term);

    // obtenemos todos los pokemons porque no se ha realizado búsqueda todavía
    const { isLoading, data: pokemonNameList = [] } = useQuery({
        queryKey: ['pokemons', 'all'],
        queryFn: () => getPokemonNamesWithId()
    });

    // memorizo la lista de pokemons(id/nombre) porque es algo que no va a cambiar
    const pokemonNameIdList = useMemo(() => {
        // si es un número
        if (!isNaN(Number(debouncedValue))) {
            const pokemon = pokemonNameList.find(pokemonItem => pokemonItem.id === Number(debouncedValue));
            return pokemon ? [pokemon] : [];
        }

        if (debouncedValue.length === 0) return [];
        if (debouncedValue.length < 3) return [];

        return pokemonNameList.filter(pokemon =>
            pokemon.name.includes(debouncedValue.toLocaleLowerCase())
        );

    }, [pokemonNameList, debouncedValue]);

    // obtenemos todos los pokemons cuyo nombre o id coincide con el texto introducido por el usuario
    const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameIdList],
        queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
        staleTime: 1000 * 60 * 5 // 5 minutos
    });

    // componente de la lista de pokemons
    const renderItem: ListRenderItem<Pokemon> = useCallback(({ item }) => <PokemonCard pokemon={item} />, []);

    if (isLoading) {
        return (<FullScreenLoader />);
    }

    return (
        <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
            <TextInput
                placeholder='Buscar Pokemon'
                mode='flat'
                autoFocus
                autoCorrect={false}
                onChangeText={setTerm}
                value={term}
            />

            {isLoadingPokemons && (
                <ActivityIndicator style={{ paddingTop: 20 }} />
            )}

            <FlatList
                data={pokemons}
                keyExtractor={(pokemon) => pokemon.id.toString()}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ height: 150 }} />}
            />
        </View>
    );
};