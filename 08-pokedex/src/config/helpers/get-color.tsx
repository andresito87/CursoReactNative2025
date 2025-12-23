import { Platform } from 'react-native';
import { getPalette, getSegmentsAverageColor } from '@somesoap/react-native-image-palette';

const FALLBACK = '#777777';

export const getColorFromImage = async (image: string): Promise<string> => {
    // Primera opción: determinar el color revisando el centro de la imagen
    try {
        const [center] = await getSegmentsAverageColor(
            image,
            [{ fromX: 20, toX: 80, fromY: 15, toY: 85 }],
            { pixelSpacingAndroid: 12 }
        );

        if (center) return center;

        // Segunda opción: determinar el color de fondo de la card revisando la paleta de colores de toda la imagen
        const palette = await getPalette(image, { fallbackColor: FALLBACK });
        if (Platform.OS === 'android') return palette.dominantAndroid ?? palette.vibrant ?? palette.muted ?? FALLBACK;

        return palette.vibrant ?? palette.muted ?? FALLBACK;

    } catch {
        return FALLBACK;
    }
};