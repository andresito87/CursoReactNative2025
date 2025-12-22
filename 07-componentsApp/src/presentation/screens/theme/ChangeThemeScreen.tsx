import { View } from 'react-native';
import { CustomView } from '../../components/ui/CustomView';
import { Title } from '../../components/ui/Title';
import { Button } from '../../components/ui/Button';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Text } from 'react-native-gesture-handler';

export const ChangeThemeScreen = () => {

    const { currentTheme, colors, setTheme } = useContext(ThemeContext);

    return (
        <CustomView margin>
            <Title text={`Cambiar tema ${currentTheme}`} safe />

            <Button
                text='Light'
                onPress={() => setTheme('Light')}
            />

            <View style={{ height: 10 }} />

            <Button
                text='Dark'
                onPress={() => setTheme('Dark')}
            />

            <View style={{ height: 10 }} />

            <Text style={{ color: colors.text }}>
                {JSON.stringify(colors, null, 2)}
            </Text>

        </CustomView>
    );
};