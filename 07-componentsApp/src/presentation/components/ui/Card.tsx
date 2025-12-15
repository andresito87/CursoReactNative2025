import { StyleProp, View, ViewStyle } from 'react-native';
import { colors } from '../../screens/theme/theme';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren { //PropsWithChildren includes children as a property
    style?: StyleProp<ViewStyle>;
}

export const Card = ({ style, children }: Props) => {
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