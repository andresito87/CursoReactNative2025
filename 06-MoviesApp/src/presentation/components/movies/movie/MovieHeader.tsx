import React from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

interface Props {
    poster: string;
    originalTitle: string;
    title: string;
}

export const MovieHeader = ({ poster, originalTitle, title }: Props) => {
    const { height: screenHeight } = useWindowDimensions();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <>
            <View style={{ ...styles.imageContainer, height: screenHeight * 0.7 }}>
                <View style={styles.imageBorder}>
                    <Image style={styles.posterImage} source={{ uri: poster }} />
                </View>
            </View>

            <View style={styles.marginContainer}>
                <Text style={styles.subTitle}>{originalTitle}</Text>
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* Botón de volver flotante */}
            <View style={[styles.backButtonContainer, { top: insets.top + 8 }]}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={({ pressed }) => [
                        styles.backButton,
                        pressed && styles.backButtonPressed,
                    ]}
                >
                    <MaterialIcons name="arrow-back-ios" size={18} color="#ffffff" />
                    <Text style={styles.backButtonText}>Volver</Text>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    posterImage: {
        flex: 1,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8,
        color: '#4b5563',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
    },

    // Back button
    backButtonContainer: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        left: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(0,0,0,0.55)', // legible en fondos claros y oscuros
    },
    backButtonPressed: {
        backgroundColor: 'rgba(0,0,0,0.75)',
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
});
