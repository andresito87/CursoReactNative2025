import { useState } from 'react';
import { ActivityIndicator, Animated, ImageStyle, StyleProp, View } from 'react-native';
import { useAnimation } from '../../hooks/useAnimation';

interface Props {
    uri: string,
    style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style }: Props) => {

    const { animatedOpacity, fadeIn } = useAnimation();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

            {isLoading && (
                <ActivityIndicator
                    style={{ position: 'absolute' }}
                    color='grey'
                    size={30}
                />
            )}

            <Animated.Image
                source={{ uri }}
                onLoadEnd={() => {
                    fadeIn({}); // Permite que las imágenes aparezcan con un fade in
                    setIsLoading(false); // quitamos el loader cuando las imágenes han cargado
                }}
                style={[style, { opacity: animatedOpacity }]}
            />

        </View>
    );
};