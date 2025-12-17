import { Alert, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { CustomView } from '../../components/ui/CustomView';
import { Title } from '../../components/ui/Title';
import { globalStyles } from '../theme/theme';
import { showPrompt } from '../../../config/adapters/prompt.adapter';

export const AlertScreen = () => {

    const createTwoButtonAlert = () =>
        Alert.alert('Alert Title', 'My Alert Msg', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

    const createThreeButtonAlert = () =>
        Alert.alert('Alert Title', 'My Alert Msg', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
            {
                text: 'Ask me later',
                onPress: () => console.log('Ask me later pressed'),
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            }
        ],
            {
                cancelable: true,
                onDismiss() {
                    console.log('onDismiss');
                }
            }
        );

    const onShowPrompt = () => {

        // Componente Prompt personalizado reutilizando una librería externa
        showPrompt({
            title: 'Título',
            subtitle: 'Subtitulo del prompt',
            buttons: [
                { text: 'OK', onPress: () => console.log('OK Pressed, password'), style: 'default' },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            defaultValue: 'Valor por defecto',
            placeholder: 'Introduce un texto'
        });

        // ! Código nativo, no funciona en Android
        // Alert.prompt(
        //     'Correo electrónico',
        //     'Texto de descripción',
        //     (valor: string) => console.log({ valor }),
        //     'secure-text',
        //     'Texto por defecto',
        //     'number-pad'
        // );
    };

    return (
        <CustomView style={globalStyles.globalMargin}>
            <Title safe text='Alertas' />

            <Button
                text='Alerta - 2 Botones'
                onPress={createTwoButtonAlert}
            />

            <View style={{ height: 10 }} />

            <Button
                text='Alerta - 3 Botones'
                onPress={createThreeButtonAlert}
            />

            <View style={{ height: 10 }} />

            <Button
                text='Prompt - Input'
                onPress={onShowPrompt}
            />

        </CustomView>
    );
};