import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { Text } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useCallback, useMemo } from 'react';
import { Pokemon } from '../../../domain/entities/pokemon';

const ListHeader = ({ title = 'Pokedex' }: { title?: string; }) => (
    <Text variant="displayMedium">{title}</Text>
);

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();

    // Forma tradicional de realizar la petición http
    // const { isLoading, data: pokemons = [] } = useQuery({
    //     queryKey: ['pokemons'],
    //     queryFn: () => getPokemons(0),
    //     staleTime: 1000 * 60 * 60 // 60 minutos en los que la información no se va a refrescar
    // });

    // Realizar el infinite scroll
    const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60, // 60 minutos en los que la información no se va a refrescar
        queryFn: async (params) => {
            const pokemons = await getPokemons(params.pageParam);

            pokemons.forEach(pokemon => {
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
            });

            return pokemons;
        },
        getNextPageParam: (lastPage, pages) => pages.length,
    });

    const pokemons = useMemo(() => data?.pages.flat() ?? [], [data]);
    const renderItem: ListRenderItem<Pokemon> = useCallback(({ item }) => <PokemonCard pokemon={item} />, []);

    return (
        <View style={globalTheme.globalMargin}>

            <PokeballBg style={styles.imgPosition} />

            <FlatList
                data={pokemons}
                keyExtractor={(pokemon) => pokemon.id.toString()}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                ListHeaderComponent={ListHeader}
                renderItem={renderItem}
                onEndReachedThreshold={0.6}
                onEndReached={() => {
                    if (!isFetchingNextPage) fetchNextPage();
                }}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100
    }
});