import { Text } from 'react-native';
import { globalStyles } from '../../../config/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    text: string,
    safe?: boolean,
    backgroundColor: string;
}

export const SubTitle = ({ text, safe = false }: Props) => {

    const { top } = useSafeAreaInsets();
    const { colors } = useContext(ThemeContext);

    return (
        <Text style={{
            ...globalStyles.subTitle,
            color: colors.text,
            marginTop: safe ? top : 0,
            marginBottom: 10,
            backgroundColor: colors.cardBackground
        }}>
            {text}
        </Text>
    );
};