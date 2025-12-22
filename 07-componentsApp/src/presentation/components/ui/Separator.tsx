import { StyleProp, View, ViewStyle } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

interface Props {
    style?: StyleProp<ViewStyle>;
}

export const Separator = ({ style }: Props) => {

    const { colors } = useContext(ThemeContext);

    return (
        <View style={{
            backgroundColor: colors.cardBackground
        }}>
            <View
                style={[
                    {
                        alignSelf: 'center',
                        width: '80%',
                        height: 1,
                        backgroundColor: colors.cardBackground,
                        opacity: 0.1,
                        marginVertical: 8
                    },
                    style
                ]}>
            </View>
        </View>
    );
};