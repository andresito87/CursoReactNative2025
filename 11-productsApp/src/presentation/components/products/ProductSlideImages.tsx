import { FlatList, Image, StyleSheet, View } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';

interface Props {
    images: string[];
}

const ITEM_SIZE = 300;
const ITEM_SPACING = 14;
const RADIUS = 18;

export const ProductSlideImages = ({ images }: Props) => {

    return (images.length === 0
        ? <Image
            source={require('../../../assets/no-product-image.png')}
            style={{ width: 300, height: 300 }}
        />
        : <FlatList
            data={images}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ItemSeparatorComponent={() => <View style={{ width: ITEM_SPACING }} />}
            snapToInterval={ITEM_SIZE + ITEM_SPACING}
            decelerationRate="fast"
            bounces={false}
            renderItem={({ item }) => (
                <View style={styles.imageCard}>
                    <FadeInImage
                        uri={item}
                        style={styles.image}
                    />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    imageCard: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: RADIUS,
        overflow: 'hidden',
        backgroundColor: '#EAEAEA',

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 12,

        // Android shadow
        elevation: 6,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});