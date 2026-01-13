import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import { Alert, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { RootStackParams } from '../../navigation/StackNativeNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useState } from 'react';

interface Props extends NativeStackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {

    const { register } = useAuthStore(); // almacen del estado de autenticación
    const [isPosting, setIsPosting] = useState(false); // control del estado cuando se realiza la petición de registro
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: ''
    });

    const onRegister = async () => {
        if (!form.email || !form.password || !form.fullName) {
            Alert.alert('Por favor', 'Rellene todos los campos');
            return;
        }

        setIsPosting(true);

        try {

            const wasSuccessful = await register(form.email, form.password, form.fullName);
            if (wasSuccessful) return;
            Alert.alert('Error', 'No se pudo crear la cuenta, intentelo de nuevo');

        } finally {
            setIsPosting(false);
        }
    };

    const { height } = useWindowDimensions();

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>
                {/* Titles */}
                <Layout style={{ paddingTop: height * 0.30 }}>
                    <Text category='h1'>Crear cuenta</Text>
                    <Text
                        category='p2'
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        Por favor, crea una cuenta para continuar
                    </Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder='Nombre y Apellidos'
                        value={form.fullName}
                        onChangeText={(fullName) => setForm({ ...form, fullName })}
                        accessoryLeft={<MyIcon name='person-outline' />}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={form.email}
                        onChangeText={(email) => setForm({ ...form, email })}
                        accessoryLeft={<MyIcon name='email-outline' />}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        placeholder='Contraseña'
                        autoCapitalize='none'
                        secureTextEntry
                        value={form.password}
                        onChangeText={(password) => setForm({ ...form, password })}
                        accessoryLeft={<MyIcon name='lock' />}
                        style={{ marginBottom: 10 }}
                    />
                </Layout>

                {/* Space */}
                <Layout style={{ height: 10 }} />

                {/* Button */}
                <Layout>
                    <Button
                        disabled={isPosting}
                        accessoryRight={!isPosting ? <MyIcon name="arrow-forward-outline" white /> : undefined}
                        onPress={onRegister}
                    >
                        {isPosting ? <Spinner size="small" status="primary" /> : 'Crear'}
                    </Button>
                </Layout>

                {/* Space */}
                <Layout style={{ height: 20 }} />

                {/* Register Option */}
                <Layout
                    style={{
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <Text>¿Ya tienes cuenta?{' '}</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                    >
                        <Text
                            status='primary'
                            category='s1'
                            style={{
                                fontWeight: 'bold',
                                textDecorationLine: 'underline'
                            }}
                        >
                            Ingresa aquí
                        </Text>
                    </TouchableOpacity>

                </Layout>

            </ScrollView>
        </Layout>
    );
};