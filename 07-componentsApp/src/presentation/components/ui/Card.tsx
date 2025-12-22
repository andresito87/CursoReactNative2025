import { StyleProp, View, ViewStyle } from 'react-native';
import { PropsWithChildren, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface Props extends PropsWithChildren { //PropsWithChildren includes children as a property
    style?: StyleProp<ViewStyle>;
}

export const Card = ({ style, children }: Props) => {

    const { colors } = useContext(ThemeContext);

    return (
        <View style={[
            {
                backgroundColor: colors.cardBackground,
                borderRadius: 10,
                padding: 10
            },
            style
        ]}>
            {children}
        </View>
    );
};