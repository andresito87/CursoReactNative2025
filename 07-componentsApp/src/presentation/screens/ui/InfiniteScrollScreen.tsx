import { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { colors } from '../theme/theme';
import { FadeInImage } from '../../components/ui/FadeInImage';

export const InfiniteScrollScreen = () => {

    const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5]);

    const loadMore = () => {
        // genera un array nuevo de 5 elementos a partir del array de números utilizando su longitud
        const newArray = Array.from({ length: 5 }, (_, i) => numbers.length + i);
        setTimeout(() => {
            setNumbers([...numbers, ...newArray]);
        }, 3000);
    };

    return (
        <View style={{ backgroundColor: 'black' }}>
            <FlatList
                data={numbers}
                onEndReached={loadMore} // carga más números cuando llegamos al final de la lista
                onEndReachedThreshold={0.6} // carga más números cuando alcanzamos un límite que se representa entre 0 y 1
                keyExtractor={(item) => item.toString()}

                renderItem={({ item }) => <ListItem number={item} />}

                ListFooterComponent={() => (
                    <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                )}

            />
        </View >
    );
};

interface ListItemProps {
    number: number;
}

const ListItem = ({ number }: ListItemProps) => {

    return (

        <FadeInImage
            uri={`https://picsum.photos/id/${number}/200/300`}
            style={{
                height: 400,
                width: '100%'
            }}
        />

        // <Image
        //     source={{ uri: `https://picsum.photos/id/${number}/200/300` }}
        //     style={{
        //         height: 400,
        //         width: '100%'
        //     }}
        // />
    );
};